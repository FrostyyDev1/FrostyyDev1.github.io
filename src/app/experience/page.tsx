import Navbar from "@/components/Navbar";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-14 xl:px-16">
        <Navbar />

        <section className="py-24 md:py-32">
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-neutral-500">
            01 / Career
          </p>

          <h1 className="text-[clamp(4rem,9vw,10rem)] font-medium uppercase leading-[0.8] tracking-[-0.06em]">
            Experience
          </h1>
        </section>
      </div>
    </main>
  );
}
