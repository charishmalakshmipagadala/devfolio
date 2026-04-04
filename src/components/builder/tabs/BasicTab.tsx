import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { usePortfolio } from "../../../context/PortfolioContext";
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
  const { portfolio, dispatch } = usePortfolio();

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

  // Watch every field and sync to context in real time
  const values = watch();

  useEffect(() => {
    dispatch({ type: "SET_FIELD", field: "name", value: values.name });
  }, [values.name]);

  useEffect(() => {
    dispatch({ type: "SET_FIELD", field: "title", value: values.title });
  }, [values.title]);

  useEffect(() => {
    dispatch({ type: "SET_FIELD", field: "bio", value: values.bio });
  }, [values.bio]);

  useEffect(() => {
    dispatch({ type: "SET_FIELD", field: "email", value: values.email });
  }, [values.email]);

  useEffect(() => {
    dispatch({ type: "SET_SOCIAL", field: "github", value: values.github });
  }, [values.github]);

  useEffect(() => {
    dispatch({ type: "SET_SOCIAL", field: "linkedin", value: values.linkedin });
  }, [values.linkedin]);

  useEffect(() => {
    dispatch({ type: "SET_SOCIAL", field: "website", value: values.website });
  }, [values.website]);

  return (
    <div className="flex flex-col gap-5">
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-bold text-brand uppercase tracking-widest">
        {title}
      </div>
      {children}
    </div>
  );
}
