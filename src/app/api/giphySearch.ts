// import { NextRequest, NextResponse } from "next/server";

// export default function GET(res:NextResponse, req:NextRequest) {
//     const { search } = req.body;
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${search}&limit=10&offset=0&rating=g&lang=en`;
//     return fetch(url, {
//         headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         },
//     });
// }