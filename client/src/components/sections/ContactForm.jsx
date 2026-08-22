import { useState } from "react";
import { Send, Clock } from "lucide-react";

import { api } from "../../lib/api.js";
import { PROJECT_TYPES, BUDGETS } from "../../lib/constants.js";
import { Input, Select, Textarea } from "../ui/Form.jsx";
import Button from "../ui/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your name";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please provide a valid email";
  }
  if (values.message.trim().length < 5) {
    errors.message = "Please write a short message (5+ characters)";
  }
  return errors;
}

export default function ContactForm() {
  const toast = useToast();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((errs) => ({ ...errs, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    try {
      await api.post("/contact", values);
      setStatus("success");
      setValues(EMPTY);
      toast.success("Thanks! Your project request has been received.");
    } catch {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
          <Send size={24} className="text-emerald-400" />
        </div>
        <h3 className="heading-md text-xl sm:text-2xl">Thanks! Your project request has been received.</h3>
        <p className="max-w-md text-sm text-zinc-400">
          I'll get back to you within a day or two. If it's urgent, feel free to follow up.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Input
          id="email"
          type="email"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Input
          id="phone"
          label="Phone (optional)"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
        <Input
          id="company"
          label="Company (optional)"
          name="company"
          value={values.company}
          onChange={handleChange}
          autoComplete="organization"
        />
        <Select
          id="projectType"
          label="Project Type"
          name="projectType"
          value={values.projectType}
          onChange={handleChange}
          options={PROJECT_TYPES}
          placeholder="Select a project type"
        />
        <Select
          id="budget"
          label="Budget"
          name="budget"
          value={values.budget}
          onChange={handleChange}
          options={BUDGETS}
          placeholder="Select a range"
        />
      </div>

      <div className="mt-5">
        <Textarea
          id="message"
          label="Message"
          name="message"
          value={values.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Tell me a little about your project, goals and timeline."
          required
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock size={14} aria-hidden />
          Usually replies within 24 hours.
        </p>
        <Button type="submit" size="lg" loading={status === "submitting"}>
          Send Project Request
        </Button>
      </div>
    </form>
  );
}