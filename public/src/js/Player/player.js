var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get_songs, handle_artist, handle_artist_image, } from "../request/get.js";
$(() => {
    IndexSongsMain();
    setTimeout(() => {
        index_artists();
    }, 1500);
});
/**
 * La función `IndexSongsMain` recupera datos de canciones, las clasifica aleatoriamente y crea
 * dinámicamente tarjetas de gráficos en la interfaz de usuario para mostrar la información de la
 * canción.
 */
function IndexSongsMain() {
    // UI
    // Charts
    get_songs()
        .then((res) => {
        // Charts
        if (Array.isArray(res)) {
            let random = res.sort(() => Math.random() - 0.5);
            random.forEach((song) => {
                const { Album, Artist, Cover, Title, Path } = song;
                const ChartGrid = $(".top-charts-grid");
                const chartCard = ` 
          <div class="chart-card">
          <img src="data:image/webp;base64,${Cover}" alt="" id="chart-img">
          <!-- info -->
          <div class="chart-info">
              <p>${Title}</p>
              <p>${Artist}</p>
          </div>
          <!-- Icons and time -->
          <div class="chart-icons">
              <p>2:00</p>
              <iconify-icon icon='material-symbols:play-circle' class='' onclick="play('${Path}')"></iconify-icon>
              <iconify-icon icon='material-symbols:add-box' class=''></iconify-icon>
          </div>
            </div>`;
                ChartGrid.append(chartCard);
            });
        }
    })
        .catch((err) => {
        console.error("Error", err);
    });
}
function index_artists() {
    let image = [];
    let Artist = [];
    // API request
    const xhttp = (data) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/uploadArtist",
                type: "GET",
                dataType: "json",
                data: {
                    artist: data,
                },
                success: (response) => {
                    return resolve(response);
                },
                error: (jxqhr, textStatus, errorThrown) => {
                    return reject([jxqhr, textStatus, errorThrown]);
                },
            });
        });
    });
    // Get Artist Image
    handle_artist_image("Natanael Cano.webp").then((Response) => {
        if (typeof Response === "object" && Response !== null) {
            image = [Response];
        }
    });
    // Function get Artists
    handle_artist()
        .then((res) => {
        if (Array.isArray(res)) {
            Artist = res;
            set_UI(image, Artist);
        }
        const artist = res;
        // API request handler
        xhttp(artist)
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.error("Error", err);
        });
    })
        .catch((err) => {
        console.error("Error", err);
    });
}
function set_UI(image, Artist) {
    // UI
    const artistGrid = $(".artist-grid");
    if (Array.isArray(Artist) && Array.isArray(image) && image.length > 0) {
        const uniqueArtists = Artist.filter((value, index, self) => index === self.findIndex((t) => t.Artist === value.Artist));
        uniqueArtists.forEach((artist) => {
            const { Artist } = artist;
            const artistImage = image[0].find((img) => img.Artist === Artist);
            if (artistImage) {
                const artistCard = `
              <div class="artist-card">
              <img src="data:image/webp;base64,${artistImage.Cover}" alt="" id="artist-img">
              <p>${Artist}</p>
              </div>
              `;
                artistGrid.append(artistCard);
            }
        });
    }
}
//# sourceMappingURL=player.js.map