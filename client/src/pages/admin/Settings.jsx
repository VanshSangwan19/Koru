import { useState } from "react";
import { Save } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import { api } from "../../lib/api.js";
import { useSettings } from "../../context/SettingsContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { AdminPageHeader } from "./adminHelpers.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Textarea } from "../../components/ui/Form.jsx";
import { Spinner } from "../../components/ui/Skeleton.jsx";

function PlanEditor({ plan, index, onChange }) {
  const update = (patch) => onChange(index, { ...plan, ...patch });

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h3 className="mb-4 font-bold">{plan.name || `Plan ${index + 1}`}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Plan name" value={plan.name} onChange={(e) => update({ name: e.target.value })} />
        <Input label="Price label" value={plan.priceLabel} onChange={(e) => update({ priceLabel: e.target.value })} placeholder="e.g. Starting from ₹15,000" />
      </div>
      <div className="mt-4">
        <Input label="Tagline" value={plan.tagline} onChange={(e) => update({ tagline: e.target.value })} />
      </div>
      <div className="mt-4">
        <Textarea
          label="Features (one per line)"
          value={(plan.features || []).join("\n")}
          onChange={(e) =>
            update({
              features: e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const toast = useToast();
  const { settings, loading } = useSettings();
  const [site, setSite] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loading && !site) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  const localSite = site || settings?.site || {};
  const localPricing = pricing || settings?.pricing || { plans: [] };

  const updateSite = (patch) => setSite({ ...localSite, ...patch });
  const updatePricing = (patch) => setPricing({ ...localPricing, ...patch });

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {};
      if (site) body.site = site;
      if (pricing) body.pricing = pricing;
      await api.put("/settings", body);
      toast.success("Settings saved successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title="Admin Settings" description="Manage site settings." path="/admin/settings" />
      <AdminPageHeader
        title="Settings"
        description="Pricing and basic website information."
        action={
          <Button onClick={handleSave} loading={saving}>
            <Save size={16} />
            Save changes
          </Button>
        }
      />

      <div className="space-y-8">
        <div className="card p-6">
          <h2 className="text-lg font-bold">Pricing</h2>
          <p className="mt-1 text-sm text-zinc-500">
            These starting prices are displayed on the homepage and can be changed any time.
          </p>
          <div className="mt-5">
            <Input
              label="Pricing note"
              value={localPricing.note || ""}
              onChange={(e) => updatePricing({ note: e.target.value })}
            />
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {(localPricing.plans || []).map((plan, i) => (
              <PlanEditor
                key={i}
                plan={plan}
                index={i}
                onChange={(idx, updated) => {
                  const plans = [...(localPricing.plans || [])];
                  plans[idx] = updated;
                  updatePricing({ plans });
                }}
              />
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold">Website information</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Shown across the site in the navbar, footer and contact page.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Site name" value={localSite.name || ""} onChange={(e) => updateSite({ name: e.target.value })} />
            <Input label="Availability badge" value={localSite.availability || ""} onChange={(e) => updateSite({ availability: e.target.value })} />
            <Input label="Contact email" value={localSite.email || ""} onChange={(e) => updateSite({ email: e.target.value })} />
            <Input label="Contact phone" value={localSite.phone || ""} onChange={(e) => updateSite({ phone: e.target.value })} />
            <div className="sm:col-span-2">
              <Textarea
                label="Tagline (hero)"
                value={localSite.tagline || ""}
                onChange={(e) => updateSite({ tagline: e.target.value })}
                className="min-h-[70px]"
              />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Footer tagline"
                value={localSite.footerTagline || ""}
                onChange={(e) => updateSite({ footerTagline: e.target.value })}
                className="min-h-[70px]"
              />
            </div>
            <Input label="GitHub URL" value={localSite.socials?.github || ""} onChange={(e) => updateSite({ socials: { ...localSite.socials, github: e.target.value } })} placeholder="https://github.com/..." />
            <Input label="LinkedIn URL" value={localSite.socials?.linkedin || ""} onChange={(e) => updateSite({ socials: { ...localSite.socials, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/..." />
            <Input label="Instagram URL" value={localSite.socials?.instagram || ""} onChange={(e) => updateSite({ socials: { ...localSite.socials, instagram: e.target.value } })} placeholder="https://instagram.com/..." />
          </div>
        </div>
      </div>
    </>
  );
}