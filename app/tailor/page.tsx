"use client";
import { useState } from "react";


export default function TailorPage(){
    const [jobText, setJobText] = useState("");
    const [cvText, setCvText] = useState("");
    const [tailored, setTailored] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmite(e:React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTailored("");
        try{
            const res = await fetch("/api/tailor",{
                method: "POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify({jobText,cvText}),
            });
            const data = await res.json();
            if(res.ok) setTailored(data.tailored);
            else setError(data.error || "Something went wrong.")
        }catch{
            setError("Network error")
        }
        setLoading(false);
    }
    
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-3xl font-bold tracking-tight">Tailor your CV</h1>
            <p className="mt-2 text-slate-600">Paste the job posting + your master CV. Get a tailored version in 30 seconds</p>

            <form onSubmit={onSubmite} className="mt-8 grid gap-6">
                <label className="grid gap-2">
                    <span className="font-semibold">Job posting</span>
                    <textarea required value={jobText} onChange={(e)=>setJobText(e.target.value)} rows={8} className="rounded-lg border border-slate-300 p-3" placeholder="Paste the full job posting text..."/>
                </label>
                <label className="grid gap-2">
                    <span className="font-semibold">Your master CV</span>
                    <textarea required value={cvText} onChange={(e)=>setCvText(e.target.value)} rows={12} className="rounded-lg border border-slate-300 p-3 font-mono text-sm" placeholder="Paste your CV text here..."/>
                </label>
                <button type="submit" disabled={loading} className="justify-self-start rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:bg-slate-400">
                    {loading? "Tailoring...":"Tailor my CV"}
                </button>

            </form>
            {error && <p className="mt-6 text-red-600">{error}</p>}
            {tailored && (<section className="mt-10">
                <h2 className="text-xl font-semibold">Tailor CV</h2>
                <textarea readOnly value={tailored} rows={20} className="mt-3 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"/>
                <button onClick={()=>navigator.clipboard.writeText(tailored)} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-state-100">Copy to clipboard</button>
            </section>
        )}
        </main>
    );
}