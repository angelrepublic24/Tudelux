import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
    try {
    const { data } = await axios.get("https://api.hubapi.com/hubdb/api/v2/tables/7443628/rows?portalId=22465736", {
        headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`
        }
    });
    return new NextResponse (JSON.stringify(data.objects), {
        status: 200,
        headers: {"Content-Type": 'application/json'}
    });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({message: "Failed to fectch Addons"}), {
            status: 500
        })
    }
}