 const api=()=>{
    const KEY = "XKQiL2BafpNsI7Qfgy7&";
    return ( fetch(
        `https://vaska171717.fakturownia.pl/invoices.json?period=all&api_token=${KEY}`
    )
)
}
export default api;