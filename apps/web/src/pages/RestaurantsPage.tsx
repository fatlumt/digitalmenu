import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema } from "@digitalmenu/shared";
import { z } from "zod";

const formSchema = restaurantSchema.extend({
  socialLinks: z.record(z.string().url()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RestaurantsPage() {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages: ["en"],
      currency: "USD",
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-xl font-semibold">Create restaurant workspace</h2>
        <p className="mt-2 text-sm text-slate-400">Add the basics so guests can find you quickly.</p>
        <form
          className="mt-6 grid gap-4 md:grid-cols-2"
          onSubmit={handleSubmit((values) => {
            console.log(values);
          })}
        >
          <input className="input" placeholder="Restaurant name" {...register("name")} />
          <input className="input" placeholder="Slug" {...register("slug")} />
          <input className="input" placeholder="Logo URL" {...register("logoUrl")} />
          <input className="input" placeholder="Phone" {...register("phone")} />
          <input className="input md:col-span-2" placeholder="Address" {...register("address")} />
          <input className="input" placeholder="Currency" {...register("currency")} />
          <input className="input" placeholder="Languages (comma)" {...register("languages", {
            setValueAs: (value) => value.split(",").map((item: string) => item.trim()),
          })} />
          <button className="rounded-lg bg-brand-600 px-4 py-3 text-sm font-medium md:col-span-2" type="submit">
            Save workspace
          </button>
        </form>
      </section>
      <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-semibold">Restaurant list</h3>
        <p className="mt-2 text-sm text-slate-400">No restaurants yet. Create one to get started.</p>
        <div className="mt-4 space-y-3">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold">Sample Restaurant {item}</p>
              <p className="text-xs text-slate-500">draft • en-US</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
