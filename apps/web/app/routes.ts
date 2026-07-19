import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),
    route("success", "routes/success-page.tsx"),
    route("confirmation", "routes/confirmation.tsx"),
    route("otp", "routes/otp.tsx"),
    route("qualification", "routes/qualification.tsx")
] satisfies RouteConfig
