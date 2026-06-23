import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import {
  ArrowLeft,
  Briefcase,
  Download,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Pencil,
  Phone,
  Plus,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { supabaseBrowser } from "@/lib/supabase.browser";
import type { BlogPost, Enums, JobListing, Tables } from "@/lib/supabase-schema";

type AdminPage = "dashboard" | "blog" | "blog-edit" | "jobs" | "job-edit" | "applications" | "messages";

type AdminAppProps = {
  page: AdminPage;
  recordId?: string;
};

type Notice = {
  type: "success" | "error";
  text: string;
} | null;

type Application = Tables<"job_applications"> & {
  job_listings: Pick<JobListing, "title"> | null;
};

type ContactMessage = Tables<"contact_messages">;
type ApplicationStatus = Enums<"application_status">;
type ContactStatus = Enums<"contact_status">;

const dateInputValue = (value?: string | null) => {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("de-DE");
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("de-DE");
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const BLOG_IMAGE_BUCKET = "blog-images";
const MAX_BLOG_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_BLOG_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const ALLOWED_BLOG_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const hasAllowedBlogImageExtension = (filename: string) => {
  const lowerName = filename.toLowerCase();
  return ALLOWED_BLOG_IMAGE_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
};

const estimateReadingTime = (markdown: string) => {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_\-[\]().,;:!?/\\|]+/g, " ")
    .trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 220));
};

const statusLabel = {
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
  angenommen: "Angenommen",
  abgelehnt: "Abgelehnt",
} as const;

const messageStatusLabel = {
  neu: "Neu",
  gelesen: "Gelesen",
  beantwortet: "Beantwortet",
} as const;

const appStatusVariant = (status: string) => {
  if (status === "abgelehnt") return "destructive";
  if (status === "angenommen") return "outline";
  if (status === "in_bearbeitung") return "secondary";
  return "default";
};

const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
    Laden...
  </div>
);

const Message = ({ notice }: { notice: Notice }) => {
  if (!notice) return null;
  return (
    <div
      className={`mb-5 rounded-md border px-4 py-3 text-sm ${
        notice.type === "error"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-primary/20 bg-primary/10 text-primary"
      }`}
    >
      {notice.text}
    </div>
  );
};

const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 bg-foreground/40 p-4 flex items-center justify-center">
    <div className="w-full max-w-xl max-h-[90vh] overflow-auto rounded-lg bg-background border border-border shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="font-serif text-xl">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Schließen
        </Button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseBrowser) {
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabaseBrowser.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};

const checkAdmin = async (userId: string) => {
  if (!supabaseBrowser) return false;

  const { data, error } = await supabaseBrowser
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return Boolean(data && !error);
};

export const AdminLogin = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    if (loading || !user) return;

    checkAdmin(user.id).then((isAdmin) => {
      if (isAdmin) {
        window.location.href = "/admin";
      }
    });
  }, [loading, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotice(null);

    if (!supabaseBrowser) {
      setNotice({ type: "error", text: "Supabase ist noch nicht konfiguriert." });
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email: email.trim(), password });

    if (error || !data.user) {
      setSubmitting(false);
      setNotice({ type: "error", text: "Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen." });
      return;
    }

    const isAdmin = await checkAdmin(data.user.id);
    setSubmitting(false);

    if (!isAdmin) {
      await supabaseBrowser.auth.signOut();
      setNotice({ type: "error", text: "Kein Zugriff. Dieser Benutzer hat keine Admin-Rechte." });
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-background px-4 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5" autoComplete="off">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-2">Admin-Login</h1>
          <p className="text-sm text-muted-foreground">Positana Pflege Hildesheim</p>
        </div>
        <Message notice={notice} />
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Wird angemeldet..." : "Anmelden"}
        </Button>
      </form>
    </div>
  );
};

export const AdminApp = ({ page, recordId }: AdminAppProps) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      window.location.replace("/admin/login");
      return;
    }

    checkAdmin(user.id).then((result) => {
      setIsAdmin(result);
      setChecking(false);
    });
  }, [loading, user]);

  if (loading || checking) return <Loading />;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-destructive mb-4">Kein Zugriff. Sie benötigen Admin-Rechte.</p>
          <Button asChild>
            <a href="/admin/login">Zum Login</a>
          </Button>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Ratgeber", icon: FileText },
    { href: "/admin/jobs", label: "Stellen", icon: Briefcase },
    { href: "/admin/applications", label: "Bewerbungen", icon: Users },
    { href: "/admin/messages", label: "Kontakt", icon: Mail },
  ];

  const currentPath = typeof window === "undefined" ? "/admin" : window.location.pathname;

  const signOut = async () => {
    await supabaseBrowser?.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 lg:min-h-screen">
        <div className="flex lg:block items-center justify-between gap-4">
          <h1 className="font-serif text-xl lg:mb-8">Admin</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <nav className="mt-4 lg:mt-0 grid grid-cols-2 sm:grid-cols-5 lg:flex lg:flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                currentPath === item.href || (item.href !== "/admin" && currentPath.startsWith(item.href))
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden lg:block mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user.email}</p>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {page === "dashboard" && <Dashboard />}
        {page === "blog" && <BlogList />}
        {page === "blog-edit" && <BlogEditor id={recordId ?? "neu"} />}
        {page === "jobs" && <JobList />}
        {page === "job-edit" && <JobEditor id={recordId ?? "new"} />}
        {page === "applications" && <Applications />}
        {page === "messages" && <Messages />}
      </main>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    blogTotal: 0,
    blogPublished: 0,
    blogDrafts: 0,
    jobsPublished: 0,
    applicationsTotal: 0,
    applicationsNew: 0,
    messagesNew: 0,
  });
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    const load = async () => {
      if (!supabaseBrowser) return;

      setLoading(true);
      const [blog, jobs, applications, messages] = await Promise.all([
        supabaseBrowser.from("blog_posts").select("published"),
        supabaseBrowser.from("job_listings").select("published"),
        supabaseBrowser.from("job_applications").select("status"),
        supabaseBrowser.from("contact_messages").select("status"),
      ]);

      const firstError = blog.error || jobs.error || applications.error || messages.error;
      if (firstError) {
        setNotice({ type: "error", text: "Dashboard-Daten konnten nicht geladen werden." });
      } else {
        const blogRows = blog.data ?? [];
        const jobRows = jobs.data ?? [];
        const appRows = applications.data ?? [];
        const messageRows = messages.data ?? [];
        setStats({
          blogTotal: blogRows.length,
          blogPublished: blogRows.filter((post) => post.published).length,
          blogDrafts: blogRows.filter((post) => !post.published).length,
          jobsPublished: jobRows.filter((job) => job.published).length,
          applicationsTotal: appRows.length,
          applicationsNew: appRows.filter((application) => application.status === "neu").length,
          messagesNew: messageRows.filter((message) => message.status === "neu").length,
        });
      }

      setLoading(false);
    };

    load();
  }, []);

  const cards = [
    { icon: FileText, label: "Ratgeber-Beiträge", value: stats.blogTotal, color: "text-primary" },
    { icon: Eye, label: "Veröffentlicht", value: stats.blogPublished, color: "text-accent" },
    { icon: EyeOff, label: "Entwürfe", value: stats.blogDrafts, color: "text-muted-foreground" },
    { icon: Briefcase, label: "Stellen aktiv", value: stats.jobsPublished, color: "text-primary" },
    { icon: Users, label: "Bewerbungen", value: stats.applicationsTotal, color: "text-accent" },
    { icon: Mail, label: "Neue Kontaktanfragen", value: stats.messagesNew, color: "text-destructive" },
  ];

  return (
    <section>
      <h2 className="font-serif text-3xl mb-6">Dashboard</h2>
      <Message notice={notice} />
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-lg border border-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <span className="text-sm text-muted-foreground">{card.label}</span>
              </div>
              <p className="text-3xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);

  const load = async () => {
    if (!supabaseBrowser) return;
    setLoading(true);
    const { data, error } = await supabaseBrowser
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);
    if (error) {
      setNotice({ type: "error", text: "Beiträge konnten nicht geladen werden." });
    } else {
      setPosts(data ?? []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deletePost = async (id: string) => {
    if (!supabaseBrowser || !confirm("Beitrag wirklich löschen?")) return;
    const { error } = await supabaseBrowser.from("blog_posts").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: "Beitrag konnte nicht gelöscht werden." });
    } else {
      setNotice({ type: "success", text: "Beitrag gelöscht." });
      load();
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-3xl">Ratgeber</h2>
        <Button asChild>
          <a href="/admin/blog/neu">
            <Plus className="h-4 w-4 mr-2" />
            Neuer Beitrag
          </a>
        </Button>
      </div>
      <Message notice={notice} />
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Beiträge vorhanden.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Bild</TableHead>
              <TableHead>Titel</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="w-28">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.cover_image_alt || post.title}
                      className="h-10 w-14 rounded-md object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-10 w-14 rounded-md bg-muted flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.author_name}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Veröffentlicht" : "Entwurf"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(post.published_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/admin/blog/${post.id}`} aria-label="Bearbeiten">
                        <Pencil className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} aria-label="Löschen">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

const BlogEditor = ({ id }: { id: string }) => {
  const isNew = id === "neu";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [slugManual, setSlugManual] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    author_name: "Positana Pflege Team",
    excerpt: "",
    content: "",
    category: "Alltag im Alter",
    cover_image_url: "",
    cover_image_alt: "",
    published: false,
    published_at: dateInputValue(),
  });

  useEffect(() => {
    if (isNew || !supabaseBrowser) return;

    const load = async () => {
      const { data, error } = await supabaseBrowser.from("blog_posts").select("*").eq("id", id).single();
      setLoading(false);

      if (error || !data) {
        setNotice({ type: "error", text: "Beitrag konnte nicht geladen werden." });
        return;
      }

      setForm({
        title: data.title,
        slug: data.slug,
        author_name: data.author_name ?? "Positana Pflege Team",
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        category: data.category,
        cover_image_url: data.cover_image_url ?? "",
        cover_image_alt: data.cover_image_alt ?? "",
        published: data.published,
        published_at: dateInputValue(data.published_at),
      });
      setSlugManual(true);
    };

    load();
  }, [id, isNew]);

  useEffect(() => {
    if (!slugManual && form.title) {
      setForm((current) => ({ ...current, slug: slugify(current.title) }));
    }
  }, [form.title, slugManual]);

  const save = async () => {
    if (!supabaseBrowser) return;
    setNotice(null);
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      category: form.category,
      author_name: form.author_name.trim() || "Positana Pflege Team",
      cover_image_url: form.cover_image_url.trim() || null,
      cover_image_alt: form.cover_image_alt.trim() || (form.cover_image_url ? form.title.trim() : null),
      reading_time_minutes: estimateReadingTime(form.content),
      published: form.published,
      published_at: new Date(`${form.published_at}T12:00:00`).toISOString(),
    };

    const result = isNew
      ? await supabaseBrowser.from("blog_posts").insert(payload)
      : await supabaseBrowser.from("blog_posts").update(payload).eq("id", id);

    setSaving(false);

    if (result.error) {
      setNotice({ type: "error", text: "Beitrag konnte nicht gespeichert werden." });
    } else {
      window.location.href = "/admin/blog";
    }
  };

  const uploadCoverImage = async (file: File) => {
    if (!supabaseBrowser) return;
    setNotice(null);

    if (!ALLOWED_BLOG_IMAGE_TYPES.includes(file.type) && !hasAllowedBlogImageExtension(file.name)) {
      setNotice({ type: "error", text: "Bitte laden Sie nur JPG-, PNG-, WebP- oder AVIF-Bilder hoch." });
      return;
    }

    if (file.size > MAX_BLOG_IMAGE_SIZE) {
      setNotice({ type: "error", text: "Das Bild ist zu groß. Bitte maximal 5 MB hochladen." });
      return;
    }

    setUploadingImage(true);
    const extension = file.name.toLowerCase().split(".").pop() || "jpg";
    const path = `covers/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabaseBrowser.storage.from(BLOG_IMAGE_BUCKET).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || undefined,
      upsert: false,
    });
    setUploadingImage(false);

    if (error) {
      setNotice({ type: "error", text: "Bild konnte nicht hochgeladen werden. Bitte prüfen, ob der Bucket eingerichtet ist." });
      return;
    }

    const { data } = supabaseBrowser.storage.from(BLOG_IMAGE_BUCKET).getPublicUrl(path);
    setForm((current) => ({
      ...current,
      cover_image_url: data.publicUrl,
      cover_image_alt: current.cover_image_alt || current.title || "Ratgeberbild Positana Pflege Hildesheim",
    }));
  };

  if (loading) return <p className="text-muted-foreground">Laden...</p>;

  return (
    <section className="max-w-3xl">
      <Button variant="ghost" size="sm" asChild className="mb-5">
        <a href="/admin/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück
        </a>
      </Button>
      <h2 className="font-serif text-3xl mb-6">{isNew ? "Neuer Beitrag" : "Beitrag bearbeiten"}</h2>
      <Message notice={notice} />
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(event) => {
              setSlugManual(true);
              setForm({ ...form, slug: slugify(event.target.value) });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author_name">Autor</Label>
          <Input
            id="author_name"
            value={form.author_name}
            onChange={(event) => setForm({ ...form, author_name: event.target.value })}
            placeholder="z. B. Positana Pflege Team"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie</Label>
          <select
            id="category"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {["Alltag im Alter", "Entlastung für Angehörige", "Pflege & Organisation"].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Label htmlFor="cover_image">Beitragsbild</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Empfohlen: mindestens 1200 x 630 px, JPG/PNG/WebP/AVIF, max. 5 MB.
              </p>
            </div>
            {form.cover_image_url && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setForm({ ...form, cover_image_url: "", cover_image_alt: "" })}
              >
                <X className="h-4 w-4 mr-2" />
                Entfernen
              </Button>
            )}
          </div>
          {form.cover_image_url ? (
            <img
              src={form.cover_image_url}
              alt={form.cover_image_alt || form.title || "Ratgeberbild"}
              className="aspect-[16/9] w-full rounded-md object-cover border border-border"
            />
          ) : (
            <div className="aspect-[16/9] w-full rounded-md border border-dashed border-border bg-muted/50 flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-sm">Noch kein Beitragsbild ausgewählt</span>
            </div>
          )}
          <Input
            id="cover_image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            disabled={uploadingImage}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                uploadCoverImage(file);
              }
              event.target.value = "";
            }}
          />
          <div className="space-y-2">
            <Label htmlFor="cover_image_alt">Alt-Text für das Bild</Label>
            <Input
              id="cover_image_alt"
              value={form.cover_image_alt}
              onChange={(event) => setForm({ ...form, cover_image_alt: event.target.value })}
              placeholder="Beschreiben Sie, was auf dem Bild zu sehen ist."
            />
          </div>
          {uploadingImage && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Bild wird hochgeladen...
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="published_at">Veröffentlichungsdatum</Label>
          <Input id="published_at" type="date" value={form.published_at} onChange={(event) => setForm({ ...form, published_at: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Kurztext</Label>
          <Textarea id="excerpt" rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Inhalt (Markdown)</Label>
          <Textarea id="content" rows={16} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
          <p className="text-xs text-muted-foreground">
            Lesedauer: ca. {estimateReadingTime(form.content)} Min. Verwenden Sie ## und ### Überschriften, daraus entsteht automatisch das Inhaltsverzeichnis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.published} onCheckedChange={(published) => setForm({ ...form, published })} />
          <span className="text-sm">Veröffentlicht</span>
        </div>
        <div className="flex gap-3 pt-2">
          <Button onClick={save} disabled={saving || uploadingImage || !form.title.trim() || !form.slug.trim()}>
            {saving ? "Speichern..." : "Speichern"}
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin/blog">Abbrechen</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);

  const load = async () => {
    if (!supabaseBrowser) return;
    setLoading(true);
    const { data, error } = await supabaseBrowser.from("job_listings").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      setNotice({ type: "error", text: "Stellen konnten nicht geladen werden." });
    } else {
      setJobs(data ?? []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteJob = async (id: string) => {
    if (!supabaseBrowser || !confirm("Stelle wirklich löschen?")) return;
    const { error } = await supabaseBrowser.from("job_listings").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: "Stelle konnte nicht gelöscht werden." });
    } else {
      setNotice({ type: "success", text: "Stelle gelöscht." });
      load();
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-3xl">Stellenanzeigen</h2>
        <Button asChild>
          <a href="/admin/jobs/new">
            <Plus className="h-4 w-4 mr-2" />
            Neue Stelle
          </a>
        </Button>
      </div>
      <Message notice={notice} />
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : jobs.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Stellen vorhanden.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titel</TableHead>
              <TableHead>Standort</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-28">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.employment_type}</TableCell>
                <TableCell>
                  <Badge variant={job.published ? "default" : "secondary"}>
                    {job.published ? "Veröffentlicht" : "Entwurf"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/admin/jobs/${job.id}`} aria-label="Bearbeiten">
                        <Pencil className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteJob(job.id)} aria-label="Löschen">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

const JobEditor = ({ id }: { id: string }) => {
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "Hildesheim",
    employment_type: "Teilzeit",
    published: false,
  });

  useEffect(() => {
    if (isNew || !supabaseBrowser) return;

    const load = async () => {
      const { data, error } = await supabaseBrowser.from("job_listings").select("*").eq("id", id).single();
      setLoading(false);
      if (error || !data) {
        setNotice({ type: "error", text: "Stelle konnte nicht geladen werden." });
      } else {
        setForm({
          title: data.title,
          description: data.description ?? "",
          location: data.location,
          employment_type: data.employment_type,
          published: data.published,
        });
      }
    };

    load();
  }, [id, isNew]);

  const save = async () => {
    if (!supabaseBrowser) return;
    setNotice(null);
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      location: form.location.trim() || "Hildesheim",
      employment_type: form.employment_type.trim() || "Teilzeit",
      published: form.published,
    };

    const result = isNew
      ? await supabaseBrowser.from("job_listings").insert(payload)
      : await supabaseBrowser.from("job_listings").update(payload).eq("id", id);

    setSaving(false);

    if (result.error) {
      setNotice({ type: "error", text: "Stelle konnte nicht gespeichert werden." });
    } else {
      window.location.href = "/admin/jobs";
    }
  };

  if (loading) return <p className="text-muted-foreground">Laden...</p>;

  return (
    <section className="max-w-3xl">
      <Button variant="ghost" size="sm" asChild className="mb-5">
        <a href="/admin/jobs">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück
        </a>
      </Button>
      <h2 className="font-serif text-3xl mb-6">{isNew ? "Neue Stelle" : "Stelle bearbeiten"}</h2>
      <Message notice={notice} />
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="job-title">Titel</Label>
          <Input id="job-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job-location">Standort</Label>
          <Input id="job-location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job-type">Beschäftigungsart</Label>
          <Input id="job-type" value={form.employment_type} onChange={(event) => setForm({ ...form, employment_type: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job-description">Beschreibung</Label>
          <Textarea id="job-description" rows={12} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.published} onCheckedChange={(published) => setForm({ ...form, published })} />
          <span className="text-sm">Veröffentlicht</span>
        </div>
        <Button onClick={save} disabled={saving || !form.title.trim()}>
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </div>
    </section>
  );
};

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);

  const load = async () => {
    if (!supabaseBrowser) return;
    setLoading(true);
    const { data, error } = await supabaseBrowser
      .from("job_applications")
      .select("*, job_listings(title)")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      setNotice({ type: "error", text: "Bewerbungen konnten nicht geladen werden." });
    } else {
      setApplications((data ?? []) as unknown as Application[]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateApplication = async (application: Application, nextStatus = application.status, nextNotes = notes) => {
    if (!supabaseBrowser) return;
    const { error } = await supabaseBrowser
      .from("job_applications")
      .update({ status: nextStatus, notes: nextNotes || null })
      .eq("id", application.id);

    if (error) {
      setNotice({ type: "error", text: "Bewerbung konnte nicht aktualisiert werden." });
    } else {
      setNotice({ type: "success", text: "Bewerbung aktualisiert." });
      setSelected({ ...application, status: nextStatus, notes: nextNotes || null });
      load();
    }
  };

  const downloadResume = async (path: string) => {
    if (!supabaseBrowser) return;
    const { data, error } = await supabaseBrowser.storage.from("resumes").createSignedUrl(path, 300);
    if (error || !data?.signedUrl) {
      setNotice({ type: "error", text: "Datei konnte nicht geladen werden." });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const resumePaths = useMemo(() => {
    return selected?.resume_url?.split(",").map((path) => path.trim()).filter(Boolean) ?? [];
  }, [selected]);

  return (
    <section>
      <h2 className="font-serif text-3xl mb-6">Bewerbungen</h2>
      <Message notice={notice} />
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : applications.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Bewerbungen eingegangen.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stelle</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={application.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelected(application);
                  setNotes(application.notes ?? "");
                }}
              >
                <TableCell className="font-medium">{application.name}</TableCell>
                <TableCell>{application.job_listings?.title ?? "-"}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(application.created_at)}</TableCell>
                <TableCell>
                  <Badge variant={appStatusVariant(application.status)}>
                    {statusLabel[application.status as keyof typeof statusLabel] ?? application.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                {selected.email}
              </a>
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-4 w-4" />
                {selected.phone}
              </a>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Stelle:</span> {selected.job_listings?.title ?? "-"}</p>
              <p><span className="font-medium text-foreground">Eingegangen:</span> {formatDateTime(selected.created_at)}</p>
            </div>
            {selected.cover_text && (
              <div>
                <p className="text-sm font-medium mb-1">Bewerbungstext</p>
                <div className="text-sm text-muted-foreground bg-muted rounded-md p-3 whitespace-pre-line max-h-40 overflow-auto">
                  {selected.cover_text}
                </div>
              </div>
            )}
            {resumePaths.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {resumePaths.map((path, index) => (
                  <Button key={path} variant="outline" size="sm" onClick={() => downloadResume(path)}>
                    <Download className="h-4 w-4 mr-2" />
                    Datei {index + 1}
                  </Button>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selected.status} onValueChange={(status) => updateApplication(selected, status as ApplicationStatus, notes)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabel).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="application-notes">Interne Notizen</Label>
              <Textarea id="application-notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
              <Button size="sm" onClick={() => updateApplication(selected, selected.status, notes)}>
                Notizen speichern
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);

  const load = async () => {
    if (!supabaseBrowser) return;
    setLoading(true);
    const { data, error } = await supabaseBrowser
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      setNotice({ type: "error", text: "Kontaktanfragen konnten nicht geladen werden." });
    } else {
      setMessages(data ?? []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateMessage = async (message: ContactMessage, nextStatus = message.status, nextNotes = notes) => {
    if (!supabaseBrowser) return;
    const { error } = await supabaseBrowser
      .from("contact_messages")
      .update({ status: nextStatus, notes: nextNotes || null })
      .eq("id", message.id);

    if (error) {
      setNotice({ type: "error", text: "Kontaktanfrage konnte nicht aktualisiert werden." });
    } else {
      setNotice({ type: "success", text: "Kontaktanfrage aktualisiert." });
      setSelected({ ...message, status: nextStatus, notes: nextNotes || null });
      load();
    }
  };

  const deleteMessage = async (id: string) => {
    if (!supabaseBrowser || !confirm("Diese Anfrage wirklich löschen?")) return;
    const { error } = await supabaseBrowser.from("contact_messages").delete().eq("id", id);
    if (error) {
      setNotice({ type: "error", text: "Kontaktanfrage konnte nicht gelöscht werden." });
    } else {
      setNotice({ type: "success", text: "Kontaktanfrage gelöscht." });
      setSelected(null);
      load();
    }
  };

  return (
    <section>
      <h2 className="font-serif text-3xl mb-6">Kontaktanfragen</h2>
      <Message notice={notice} />
      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Anfragen eingegangen.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelected(message);
                  setNotes(message.notes ?? "");
                  if (message.status === "neu") updateMessage(message, "gelesen", message.notes ?? "");
                }}
              >
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell className="text-muted-foreground">{message.email}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(message.created_at)}</TableCell>
                <TableCell>
                  <Badge variant={message.status === "neu" ? "default" : message.status === "gelesen" ? "secondary" : "outline"}>
                    {messageStatusLabel[message.status as keyof typeof messageStatusLabel] ?? message.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                {selected.email}
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="h-4 w-4" />
                  {selected.phone}
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Eingegangen:</span> {formatDateTime(selected.created_at)}
            </p>
            <div>
              <p className="text-sm font-medium mb-1">Nachricht</p>
              <div className="text-sm text-muted-foreground bg-muted rounded-md p-3 whitespace-pre-line max-h-60 overflow-auto">
                {selected.message}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selected.status} onValueChange={(status) => updateMessage(selected, status as ContactStatus, notes)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(messageStatusLabel).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-notes">Interne Notizen</Label>
              <Textarea id="message-notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
              <Button size="sm" onClick={() => updateMessage(selected, selected.status, notes)}>
                Notizen speichern
              </Button>
            </div>
            <div className="border-t border-border pt-4">
              <Button variant="destructive" size="sm" onClick={() => deleteMessage(selected.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Löschen
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
