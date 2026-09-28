const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const builder = new addonBuilder({
    id: "org.allinoneaddon",
    version: "1.0.0",
    name: "إضافة المحتوى الشامل",
    description: "إضافة تجمع الأفلام، المسلسلات، الأنمي، والبرامج",
    resources: ["catalog"],
    types: ["movie", "series", "anime", "tv"],
    catalogs: [
        { type: "movie", id: "all_movies", name: "الأفلام" },
        { type: "series", id: "all_series", name: "المسلسلات" },
        { type: "anime", id: "all_anime", name: "الأنمي" },
        { type: "tv", id: "all_tv", name: "البرامج والبودكاست" }
    ]
});

builder.defineCatalogHandler((args) => {
    if (args.type === "movie") {
        return Promise.resolve({
            metas: [
                {
                    id: "tt0111161",
                    type: "movie",
                    name: "The Shawshank Redemption",
                    poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg"
                }
            ]
        });
    } else if (args.type === "series") {
        return Promise.resolve({
            metas: [
                {
                    id: "tt0944947",
                    type: "series",
                    name: "Game of Thrones",
                    poster: "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGIzMi00NDI5LTgxMzItN2M5MjJhMTRjYWU1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
                }
            ]
        });
    } else if (args.type === "anime") {
        return Promise.resolve({
            metas: [
                {
                    id: "tt0407362",
                    type: "anime",
                    name: "One Piece",
                    poster: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxGP123456@._V1_SX300.jpg"
                }
            ]
        });
    }
    return Promise.resolve({ metas: [] });
});

serveHTTP(builder.getInterface(), { port: 7000 });
console.log("Addon running at: http://127.0.0.1:7000/manifest.json");