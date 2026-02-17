import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "./routes/about.tsx"),

  route("contact", "./routes/contact.tsx"),

  ...prefix("p2p", [index("./routes/pornSettings.tsx")]),

  ...prefix("day-completion", [
    index("./routes/dayCompletion.tsx"),
    // route(":date", "./routes/dayCompletionDate.tsx"),
  ]),

  ...prefix("listings", [
    index("./routes/listings.tsx"),
    route(":listing", "./routes/listing.tsx"),
  ]),

  ...prefix("countries", [
    index("./routes/countries.tsx"),
    route(":countryName", "./routes/country.tsx"),
  ]),
] satisfies RouteConfig;
