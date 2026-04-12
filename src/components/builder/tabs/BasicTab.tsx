import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { usePortfolioStore } from "../../../store/portfolioStore";
import { Input, TextArea } from "../../ui";

const basicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Max 300 characters"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  github: z.string().url("Enter a valid URL").or(z.literal("")),
  linkedin: z.string().url("Enter a valid URL").or(z.literal("")),
  website: z.string().url("Enter a valid URL").or(z.literal("")),
});

type BasicFormData = z.infer<typeof basicSchema>;

export function BasicTab() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const setField = usePortfolioStore((s) => s.setField);
  const setSocial = usePortfolioStore((s) => s.setSocial);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: portfolio.name,
      title: portfolio.title,
      bio: portfolio.bio,
      email: portfolio.email,
      github: portfolio.social.github,
      linkedin: portfolio.social.linkedin,
      website: portfolio.social.website,
    },
    mode: "onChange",
  });

  // Watch every field and sync to store in real time
  const values = watch();

  useEffect(() => { setField("name", values.name); }, [values.name]);
  useEffect(() => { setField("title", values.title); }, [values.title]);
  useEffect(() => { setField("bio", values.bio); }, [values.bio]);
  useEffect(() => { setField("email", values.email); }, [values.email]);
  useEffect(() => { setSocial("github", values.github); }, [values.github]);
  useEffect(() => { setSocial("linkedin", values.linkedin); }, [values.linkedin]);
  useEffect(() => { setSocial("website", values.website); }, [values.website]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="Profile">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Title / Role"
          placeholder="Full Stack Developer"
          error={errors.title?.message}
          {...register("title")}
        />
        <TextArea
          label="Bio"
          placeholder="A brief description about yourself..."
          error={errors.bio?.message}
          {...register("bio")}
        />
      </Section>

      <Section title="Contact & Links">
        <Input
          label="Email"
          placeholder="you@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="GitHub URL"
          placeholder="https://github.com/username"
          error={errors.github?.message}
          {...register("github")}
        />
        <Input
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/username"
          error={errors.linkedin?.message}
          {...register("linkedin")}
        />
        <Input
          label="Website"
          placeholder="https://yoursite.com"
          error={errors.website?.message}
          {...register("website")}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 2 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
