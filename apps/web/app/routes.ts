import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home-main.tsx"),
    route("/application-form/:amount/:term", "routes/application-form.tsx"),
    route("/process/:amount", "routes/process-new.tsx"),
    route("/otp/:phone/:amount", "routes/otp-new.tsx"),
    route("/api/main", "routes/api.tsx"),
    route("/webhook", "routes/webhook.tsx"),
    route("/pool/:id", "routes/pool.tsx"),
    route("success", "routes/success.tsx"),
    // route("confirmation", "routes/confirmation.tsx"),
    // route("otp", "routes/otp.tsx"),
    // route("qualification", "routes/qualification.tsx")
] satisfies RouteConfig
