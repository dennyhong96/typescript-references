import "./app.css";

import axios from "axios";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeoCodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

window.addEventListener("load", function () {
  document.head.insertAdjacentHTML(
    "beforeend",
    `<script async
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}">
</script>`
  );
});

form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const address = addressInput.value;

  axios
    .get<GoogleGeoCodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not fetch location.");
      }

      const coords = res.data.results[0].geometry.location;

      // Create a map
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLDivElement,
        { center: coords, zoom: 16 }
      );

      // Place a marker
      new google.maps.Marker({ position: coords, map });
    })
    .catch((error: Error) => alert(error.message));
});

console.log(process.env.GOOGLE_API_KEY);
