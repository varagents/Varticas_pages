import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface BetaUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROFESSION_OPTIONS = [
  "Student",
  "Software Developer",
  "AI / ML Engineer",
  "Founder / Entrepreneur",
  "Product Manager",
  "Other"
];

const EXPERIENCE_OPTIONS = [
  "Student (no experience)",
  "0 – 1 years",
  "1 – 3 years",
  "3 – 5 years",
  "5 – 10 years",
  "10+ years"
];

const SOURCE_OPTIONS = [
  "LinkedIn",
  "Twitter / X",
  "GitHub",
  "YouTube",
  "Friend / Referral",
  "Community (Discord / Slack)",
  "Google Search",
  "Other"
];

const INTEGRATION_OPTIONS = [
  "Gmail",
  "Google Calendar",
  "Notion",
  "Slack",
  "GitHub",
  "ClickUp",
  "Linear",
  "Trello",
  "Google Drive",
  "Other"
];

export default function BetaUserModal({ isOpen, onClose }: BetaUserModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    experience: "",
    organization: "",
    source: "",
    integrations: [] as string[],
    useCase: "",
    otherProfession: "",
    otherSource: "",
    otherIntegration: "",
  });

  const totalSteps = 8;

  const handleNext = () => {
    if (step === 1 && !formData.name) return toast.error("Please enter your name");
    if (step === 2 && (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))) return toast.error("Please enter a valid email");
    if (step === 3 && !formData.profession) return toast.error("Please select your profession");
    if (step === 3 && formData.profession === "Other" && !formData.otherProfession) return toast.error("Please specify your profession");
    if (step === 4 && !formData.experience) return toast.error("Please select your experience level");
    if (step === 6 && !formData.source) return toast.error("Please let us know where you found us");
    if (step === 6 && formData.source === "Other" && !formData.otherSource) return toast.error("Please specify how you found us");
    if (step === 7 && formData.integrations.length === 0) return toast.error("Please select at least one app");
    if (step === 7 && formData.integrations.includes("Other") && !formData.otherIntegration) return toast.error("Please specify the other app");
    if (step === 8 && !formData.useCase) return toast.error("Please briefly explain your use case");

    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleIntegrationToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(id)
        ? prev.integrations.filter((i) => i !== id)
        : [...prev.integrations, id],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        profession: formData.profession === "Other" ? formData.otherProfession : formData.profession,
        source: formData.source === "Other" ? formData.otherSource : formData.source,
        integrations: formData.integrations.includes("Other")
          ? [...formData.integrations.filter(i => i !== "Other"), formData.otherIntegration].filter(Boolean)
          : formData.integrations
      };

      const response = await fetch("/api/beta-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      setIsSuccess(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        profession: "",
        experience: "",
        organization: "",
        source: "",
        integrations: [],
        useCase: "",
        otherProfession: "",
        otherSource: "",
        otherIntegration: "",
      });
    }, 300);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const renderStepContent = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <CheckCircle2 className="w-20 h-20 text-brand-red mb-2" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">🎉 Application Submitted</h3>
          <p className="text-gray-400 max-w-[280px]">
            Thanks for applying to the Varticas Beta! We'll review your application and contact you soon.
          </p>
          <Button
            onClick={resetAndClose}
            className="mt-6 bg-white text-black hover:bg-gray-200"
          >
            Close Window
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg">What is your name?</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="email" className="text-lg">What is your email address?</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label className="text-lg">What best describes your profession?</Label>
            <RadioGroup
              value={formData.profession}
              onValueChange={(val) => setFormData({ ...formData, profession: val })}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              {PROFESSION_OPTIONS.map((profession) => (
                <div
                  key={profession}
                  className={`flex flex-col items-start justify-center border rounded-xl p-4 cursor-pointer transition-all ${formData.profession === profession ? "border-brand-red bg-brand-red/10" : "border-white/10 hover:bg-white/5"}`}
                  onClick={() => setFormData({ ...formData, profession })}
                >
                  <RadioGroupItem value={profession} id={`prof-${profession}`} className="sr-only" />
                  <Label htmlFor={`prof-${profession}`} className="cursor-pointer font-medium w-full h-full">{profession}</Label>
                </div>
              ))}
            </RadioGroup>
            {formData.profession === "Other" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
                <Input
                  placeholder="Please specify your profession"
                  value={formData.otherProfession}
                  onChange={(e) => setFormData({ ...formData, otherProfession: e.target.value })}
                  className="bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </motion.div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label className="text-lg">How many years of experience do you have in this profession?</Label>
            <RadioGroup
              value={formData.experience}
              onValueChange={(val) => setFormData({ ...formData, experience: val })}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              {EXPERIENCE_OPTIONS.map((exp) => (
                <div
                  key={exp}
                  className={`flex flex-col items-start justify-center border rounded-xl p-4 cursor-pointer transition-all ${formData.experience === exp ? "border-brand-red bg-brand-red/10" : "border-white/10 hover:bg-white/5"}`}
                  onClick={() => setFormData({ ...formData, experience: exp })}
                >
                  <RadioGroupItem value={exp} id={`exp-${exp}`} className="sr-only" />
                  <Label htmlFor={`exp-${exp}`} className="cursor-pointer font-medium w-full h-full">{exp}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="organization" className="text-lg">Organization or College name</Label>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Optional</span>
            </div>
            <Input
              id="organization"
              placeholder="e.g. Acme Corp or Stanford University"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="mt-2 bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <Label className="text-lg">Where did you hear about Varticas?</Label>
            <div className="flex flex-wrap gap-2 mt-4">
              {SOURCE_OPTIONS.map((source) => {
                const isSelected = formData.source === source;
                return (
                  <button
                    key={source}
                    onClick={() => setFormData({ ...formData, source })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                      } border`}
                  >
                    {source}
                  </button>
                )
              })}
            </div>
            {formData.source === "Other" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
                <Input
                  placeholder="Please specify how you heard about us"
                  value={formData.otherSource}
                  onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
                  className="bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </motion.div>
            )}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <Label className="text-lg">Which apps would you like to automate with Varticas?</Label>
            <div className="flex flex-wrap gap-2 mt-4">
              {INTEGRATION_OPTIONS.map((integration) => {
                const isSelected = formData.integrations.includes(integration);
                return (
                  <button
                    key={integration}
                    onClick={() => handleIntegrationToggle(integration)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                        ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(255,59,48,0.3)]'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                      } border`}
                  >
                    {integration} {isSelected && "✓"}
                  </button>
                )
              })}
            </div>
            {formData.integrations.includes("Other") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
                <Input
                  placeholder="Please specify other apps"
                  value={formData.otherIntegration}
                  onChange={(e) => setFormData({ ...formData, otherIntegration: e.target.value })}
                  className="bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </motion.div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <Label htmlFor="useCase" className="text-lg">How do you plan to use Varticas?</Label>
            <Textarea
              id="useCase"
              placeholder="Example: Automate GitHub issues, manage Gmail with AI agents, sync Notion tasks with Slack, etc."
              value={formData.useCase}
              onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
              className="mt-2 min-h-[120px] bg-white/10 border-white/15 text-white placeholder:text-gray-500 focus:border-white/40"
              autoFocus
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[550px] bg-[#0F1012] border-white/10 text-white p-0 gap-0 overflow-hidden">
        <div className="p-6">
          {!isSuccess && (
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl pt-2 text-white">Join Varticas Beta</DialogTitle>
              <DialogDescription className="text-gray-400">
                Step {step} of {totalSteps}
              </DialogDescription>
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-brand-red rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </DialogHeader>
          )}

          <div className={`${!isSuccess ? "min-h-[250px]" : ""} relative`}>
            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={isSuccess ? "success" : step}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={isSuccess ? "" : "absolute inset-0 w-full"}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {!isSuccess && (
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5 relative z-10 bg-[#0F1012]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1 || isLoading}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {step < totalSteps ? (
                <Button onClick={handleNext} className="bg-white text-black hover:bg-gray-200">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-brand-red hover:bg-brand-red/90 text-white min-w-[120px]"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>Submit Application <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
