import * as weather from "fitbit-weather/companion";

weather.setup({
    provider: weather.Providers.openweathermap,
    apiKey: "17b69216de64de6cc6d7f786e40d8a09"
});
