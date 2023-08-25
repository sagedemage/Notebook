export default function Redirect(route_name) {
    /* Redirect and Reload the redirected page */
    const route = "#" + route_name;
    location.href = route;
    location.reload(true);
}