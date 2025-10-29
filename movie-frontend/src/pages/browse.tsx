/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import MainHeader from "../components/main-header";
import LogoLoop from "../components/LogoLoop";
import MovieCard from "../components/movie-card";
import {
    Table, TableBody, TableCaption, TableCell,
    TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Edit, Trash, Save, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface MediaItem {
    id: number;
    title: string;
    imgUrl: string;
    releaseDate: string;
    description: string;
    director: string;
    rating: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    type: "movie" | "tvshow";
    budget?: number | null;
    location?: string | null;
}

function Browse() {
    const [mediaData, setMediaData] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableMode, setTableMode] = useState(false);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<Partial<MediaItem>>({});
    const [visibleCount, setVisibleCount] = useState(10);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const BASE_URL = "https://movie-web-g1m4.onrender.com";

    useEffect(() => {
        const storedMode = localStorage.getItem("tableMode");
        if (storedMode) setTableMode(storedMode === "true");
    }, []);

    useEffect(() => {
        const updateMode = () => {
            const storedMode = localStorage.getItem("tableMode") === "true";
            setTableMode(storedMode);
        };
        window.addEventListener("tableModeChanged", updateMode);
        return () => window.removeEventListener("tableModeChanged", updateMode);
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [moviesRes, tvRes] = await Promise.all([
                fetch(`${BASE_URL}/movies`),
                fetch(`${BASE_URL}/tvshows`),
            ]);
            const movies = await moviesRes.json();
            const tvshows = await tvRes.json();

            const formattedMovies = movies.map((m: any) => ({ ...m, type: "movie" }));
            const formattedTV = tvshows.map((t: any) => ({ ...t, type: "tvshow" }));

            setMediaData([...formattedMovies, ...formattedTV]);
        } catch (error) {
            console.error("Error fetching media:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number, type: "movie" | "tvshow") => {
        if (!confirm(`Delete this ${type}?`)) return;
        setLoadingId(id);
        try {
            const res = await fetch(`${BASE_URL}/${type === "movie" ? "movies" : "tvshows"}/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            alert(`${type} deleted successfully!`);
            await fetchData();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoadingId(null);
        }
    };

    const handleEditStart = (item: MediaItem) => {
        setEditingId(item.id);
        setEditedItem({ ...item });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditedItem({});
    };

    const handleEditSave = async (id: number, type: "movie" | "tvshow") => {
        setLoadingId(id);
        try {
            const res = await fetch(`${BASE_URL}/${type === "movie" ? "movies" : "tvshows"}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedItem),
            });
            if (!res.ok) throw new Error("Failed to update");
            alert(`${type} updated successfully!`);
            await fetchData();
            setEditingId(null);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoadingId(null);
        }
    };

    const handleChange = (field: keyof MediaItem, value: any) => {
        setEditedItem((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!loaderRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setVisibleCount((prev) => prev + 10);
            },
            { threshold: 1 }
        );
        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [mediaData]);

    const visibleItems = mediaData.slice(0, visibleCount);
    const movies = visibleItems.filter((item) => item.type === "movie");
    const tvshows = visibleItems.filter((item) => item.type === "tvshow");

    const movieCards = movies.map((m) => ({
        node: <MovieCard key={m.id} title={m.title} imgURL={m.imgUrl} rating={m.rating} releaseDate={m.releaseDate} />,
    }));

    const tvCards = tvshows.map((t) => ({
        node: <MovieCard key={t.id} title={t.title} imgURL={t.imgUrl} rating={t.rating} releaseDate={t.releaseDate} />,
    }));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <MainHeader />


            {/* Combined Table */}
            {tableMode ? (
                <div className="mt-10 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Combined Table (Movies + TV Shows)</h2>

                    <div className="w-full overflow-x-auto overflow-y-auto max-h-[70vh] rounded-lg border">
                        <Table className="min-w-max">
                            <TableCaption>All items from both Movies and TV Shows</TableCaption>
                            <TableHeader className="sticky top-0 bg-background/90 backdrop-blur z-20">
                                <TableRow>
                                    <TableHead>Poster</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Release Date</TableHead>
                                    <TableHead>Director</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {visibleItems.map((item) => (
                                    <TableRow key={`${item.type}-${item.id}`} className="hover:bg-muted/40">
                                        <TableCell>
                                            <img src={item.imgUrl} alt={item.title} className="w-16 h-20 object-cover rounded-md" />
                                        </TableCell>
                                        <TableCell className="capitalize font-semibold">
                                            {item.type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                                        </TableCell>

                                        {editingId === item.id ? (
                                            <>
                                                <TableCell>
                                                    <Input value={editedItem.title ?? ""} onChange={(e) => handleChange("title", e.target.value)} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        value={editedItem.rating ?? ""}
                                                        onChange={(e) => handleChange("rating", parseFloat(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="date"
                                                        value={editedItem.releaseDate?.split("T")[0] ?? ""}
                                                        onChange={(e) => handleChange("releaseDate", e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={editedItem.director ?? ""}
                                                        onChange={(e) => handleChange("director", e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Textarea
                                                        value={editedItem.description ?? ""}
                                                        onChange={(e) => handleChange("description", e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={editedItem.budget ?? ""}
                                                        onChange={(e) => handleChange("budget", parseFloat(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={editedItem.location ?? ""}
                                                        onChange={(e) => handleChange("location", e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>{item.userId}</TableCell>
                                                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                                                <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
                                                <TableCell className="flex flex-col gap-2 items-center justify-center">
                                                    <Button
                                                        variant="outline"
                                                        className="w-24 h-10 text-green-600"
                                                        onClick={() => handleEditSave(item.id, item.type)}
                                                        disabled={loadingId === item.id}
                                                    >
                                                        <Save className="mr-1" /> Save
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-24 h-10 text-destructive"
                                                        onClick={handleEditCancel}
                                                    >
                                                        <X className="mr-1" /> Cancel
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell>{item.rating}</TableCell>
                                                <TableCell>{item.releaseDate.split("T")[0]}</TableCell>
                                                <TableCell>{item.director}</TableCell>
                                                <TableCell className="max-w-[300px] whitespace-pre-wrap break-words">
                                                    {item.description}
                                                </TableCell>
                                                <TableCell>{item.budget ?? "-"}</TableCell>
                                                <TableCell>{item.location ?? "-"}</TableCell>
                                                <TableCell>{item.userId}</TableCell>
                                                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                                                <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
                                                <TableCell className="flex flex-col gap-2 items-center justify-center">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditStart(item)}
                                                        className="w-24 h-10 text-primary"
                                                        disabled={loadingId === item.id}
                                                    >
                                                        <Edit className="mr-1" /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-24 h-10 text-destructive"
                                                        onClick={() => handleDelete(item.id, item.type)}
                                                        disabled={loadingId === item.id}
                                                    >
                                                        <Trash className="mr-1" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div ref={loaderRef} className="h-10 flex justify-center items-center">
                            {visibleCount < mediaData.length && (
                                <p className="text-muted-foreground text-sm">Loading more...</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-8 flex flex-col gap-10 items-center">
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Browse Movies</h2>
                            {isLoading ? (
                                <p className="text-muted-foreground text-center">Loading movies...</p>
                            ) : (
                                <div style={{ height: "250px", overflow: "hidden", width: "100%" }}>
                                    <LogoLoop
                                        logos={movieCards}
                                        speed={30}
                                        direction="right"
                                        logoHeight={48}
                                        gap={50}
                                        pauseOnHover
                                        scaleOnHover
                                        fadeOut
                                    />
                                </div>
                            )}
                        </div>

                        <div className="w-full">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Browse TV Shows</h2>
                            {isLoading ? (
                                <p className="text-muted-foreground text-center">Loading tv shows...</p>
                            ) : (
                                <div style={{ height: "250px", overflow: "hidden", width: "100%" }}>
                                    <LogoLoop
                                        logos={tvCards}
                                        speed={30}
                                        direction="left"
                                        logoHeight={48}
                                        gap={50}
                                        pauseOnHover
                                        scaleOnHover
                                        fadeOut
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default Browse;