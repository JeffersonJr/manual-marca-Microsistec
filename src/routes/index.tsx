/**
 * Criado e desenvolvido por Evolves Tecnologia (Jefferson Campos)
 */
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Settings, Palette, Eye, ArrowRight, ArrowLeft, Upload, X, Check, Download, FileUp, CloudUpload } from "lucide-react";
import { toast, Toaster } from "sonner";
import { DynamicLogoMark } from "@/components/brand/DynamicLogoMark";
import { loadBrandsServer, saveBrandServer, saveAllBrandsServer } from "@/lib/api/brands.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manual de Marca — Portal de Identidades Visuais" },
      { name: "description", content: "Portal para gerenciar e criar manuais de marca e identidades visuais de forma rápida e elegante." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Dashboard,
});

interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  symbolUrl?: string;
  logoReverseUrl?: string;
  symbolReverseUrl?: string;
  mission: string;
  vision: string;
  promise: string;
  customDomain?: string;
  values: { name: string; description: string }[];
  palette: {
    primary: { name: string; hex: string; role: string; token: string }[];
    secondary: { name: string; hex: string; role: string; token: string }[];
    accent: { name: string; hex: string; role: string; token: string }[];
    neutrals: { name: string; hex: string }[];
  };
}

export const generateEssence = (name: string, presentation: string) => {
  const cleanPres = presentation.trim().replace(/\.+$/, "");
  const words = cleanPres.split(" ");
  const firstFewWords = words.slice(0, 5).join(" ");
  
  const defaultMission = `Prover excelência e inovação através de ${cleanPres.toLowerCase()}, transformando a realidade de nossos clientes com compromisso e qualidade.`;
  const defaultVision = `Tornar-se a referência no setor, sendo reconhecida pela liderança inovadora em ${firstFewWords.toLowerCase()} e impacto positivo.`;
  const defaultPromise = `Entregar de forma consistente confiança, qualidade e evolução constante em todas as soluções de ${name}.`;
  
  return {
    mission: defaultMission,
    vision: defaultVision,
    promise: defaultPromise
  };
};

export const extractColorsFromImage = (base64Str: string): Promise<{ primary: string; secondary: string }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ primary: "#2b5250", secondary: "#5aa6a6" });
          return;
        }
        canvas.width = 30;
        canvas.height = 30;
        ctx.drawImage(img, 0, 0, 30, 30);
        const imgData = ctx.getImageData(0, 0, 30, 30).data;
        
        const colorMap: Record<string, number> = {};
        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i+1];
          const b = imgData[i+2];
          const a = imgData[i+3];
          if (a < 180) continue; 
          const rgbSum = r + g + b;
          if (rgbSum > 690 || rgbSum < 80) continue; // Skip white/black
          
          const qr = Math.round(r / 15) * 15;
          const qg = Math.round(g / 15) * 15;
          const qb = Math.round(b / 15) * 15;
          const hex = "#" + [qr, qg, qb].map(x => {
            const h = Math.max(0, Math.min(255, x)).toString(16);
            return h.length === 1 ? "0" + h : h;
          }).join("");
          
          colorMap[hex] = (colorMap[hex] || 0) + 1;
        }
        
        const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
        
        let primary = "#2b5250";
        let secondary = "#5aa6a6";
        
        if (sortedColors.length > 0) {
          primary = sortedColors[0][0];
        }
        if (sortedColors.length > 1) {
          secondary = sortedColors[1][0];
        } else {
          secondary = primary === "#2b5250" ? "#5aa6a6" : "#2b5250";
        }
        resolve({ primary, secondary });
      } catch {
        resolve({ primary: "#2b5250", secondary: "#5aa6a6" });
      }
    };
    img.onerror = () => {
      resolve({ primary: "#2b5250", secondary: "#5aa6a6" });
    };
    img.src = base64Str;
  });
};

const defaultMicrosistec: Brand = {
  id: "microsistec",
  name: "Microsistec",
  description: "Sistema de identidade visual robusto e minimalista construído para a Microsistec, definindo logos, paletas de cores e aplicações de design.",
  mission: "Tornar a tecnologia previsível para empresas que dependem dela todos os dias.",
  vision: "Ser o sistema invisível por trás das operações digitais mais confiáveis do país.",
  promise: "Precisão de engenheiro, clareza de designer, ritmo de operador.",
  values: [
    { name: "Precisão", description: "Grid rígido, alinhamentos exatos, números monoespaçados." },
    { name: "Confiança", description: "Verde profundo, contraste alto, tipografia sem ornamentos." },
    { name: "Inovação", description: "Espaço negativo generoso, transições sutis, geometria limpa." },
    { name: "Simplicidade", description: "Menos elementos, mais hierarquia. Sempre uma ação primária." },
  ],
  palette: {
    primary: [
      { name: "Microsistec Teal", hex: "#2B5250", role: "Cor primária. Logo, headers, CTAs principais.", token: "--teal-deep" },
      { name: "Graphite Ink", hex: "#1A1A1A", role: "Wordmark e texto principal.", token: "--ink" },
    ],
    secondary: [
      { name: "Aqua Signal", hex: "#5AA6A6", role: "Apoio, ícones, destaques sutis.", token: "--teal-mid" },
      { name: "Mint Lume", hex: "#7CC1C1", role: "Backgrounds suaves, ilustrações.", token: "--teal-light" },
      { name: "Deep Shade", hex: "#1B2A2A", role: "Profundidade, dark UI.", token: "--teal-shadow" },
    ],
    accent: [
      { name: "Signal Amber", hex: "#E8A14B", role: "Alertas, badges, hover ativos.", token: "--amber" },
      { name: "Paper Cream", hex: "#F7F3EA", role: "Fundo alternativo, materiais impressos.", token: "--cream" },
    ],
    neutrals: [
      { name: "Snow", hex: "#FAFBFB" },
      { name: "Fog", hex: "#E8EDED" },
      { name: "Slate", hex: "#6B7878" },
      { name: "Ink", hex: "#1A1A1A" },
    ],
  },
};

function Dashboard() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([defaultMicrosistec]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [logoBase64, setLogoBase64] = useState<string>("");
  const [symbolBase64, setSymbolBase64] = useState<string>("");
  const [logoReverseBase64, setLogoReverseBase64] = useState<string>("");
  const [symbolReverseBase64, setSymbolReverseBase64] = useState<string>("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [promise, setPromise] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [secondaryColor, setSecondaryColor] = useState("#06b6d4");
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [customDomain, setCustomDomain] = useState("");

  const serverBrandsRef = useRef<Brand[]>([]);

  // Merge server brands (public/custom-brands.json) with localStorage overrides
  const getMergedBrands = useCallback((): Brand[] => {
    const localStored = localStorage.getItem("custom_brands");
    const deletedIds: string[] = JSON.parse(localStorage.getItem("deleted_brand_ids") || "[]");

    let localBrands: Brand[] = [];
    if (localStored) {
      try { localBrands = JSON.parse(localStored); } catch { /* ignore */ }
    }

    // Merge: start with server brands, overlay with localStorage
    const map = new Map<string, Brand>();
    for (const b of serverBrandsRef.current) {
      if (!deletedIds.includes(b.id)) map.set(b.id, b);
    }
    for (const b of localBrands) {
      if (!deletedIds.includes(b.id)) map.set(b.id, b);
    }

    return Array.from(map.values());
  }, []);

  // Load brands from server + localStorage
  useEffect(() => {
    loadBrandsServer()
      .then((serverBrands: Brand[]) => {
        serverBrandsRef.current = serverBrands;
        const merged = getMergedBrands();
        setBrands([defaultMicrosistec, ...merged]);
      })
      .catch((err) => {
        console.error("Failed to load brands from server:", err);
        // Fallback to localStorage only
        const merged = getMergedBrands();
        setBrands([defaultMicrosistec, ...merged]);
      });
  }, [getMergedBrands]);

  // Redirect to brand page if accessing via custom domain
  useEffect(() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("bypass") === "true") return;

    const matched = brands.find(b => b.customDomain && b.customDomain.toLowerCase().trim() === host.toLowerCase().trim());
    if (matched) {
      router.navigate({ to: "/brand/$brandId", params: { brandId: matched.id } });
    }
  }, [brands, router]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      setLogoBase64(b64);
      toast.success("Logo carregada com sucesso!");
      try {
        toast.info("Analisando logotipo para extrair cores...");
        const colors = await extractColorsFromImage(b64);
        setPrimaryColor(colors.primary);
        setSecondaryColor(colors.secondary);
        toast.success("Cores primária e secundária detectadas e configuradas automaticamente!");
      } catch (err) {
        console.error("Erro ao extrair cores:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSymbolUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSymbolBase64(reader.result as string);
      toast.success("Símbolo carregado com sucesso!");
    };
    reader.readAsDataURL(file);
  };

  const handleLogoReverseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoReverseBase64(reader.result as string);
      toast.success("Logo reversa carregada com sucesso!");
    };
    reader.readAsDataURL(file);
  };

  const handleSymbolReverseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSymbolReverseBase64(reader.result as string);
      toast.success("Símbolo reverso carregado com sucesso!");
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      toast.error("Por favor, preencha o nome da marca.");
      return;
    }
    if (!description.trim()) {
      toast.error("Por favor, preencha a Apresentação / Descrição da marca.");
      return;
    }
    if (!logoBase64 || !logoReverseBase64 || !symbolBase64 || !symbolReverseBase64) {
      toast.error("Por favor, envie todas as 4 variações de logo obrigatórias: Logotipo Completo, Logotipo Reverso, Símbolo Isolado e Símbolo Reverso.");
      return;
    }

    const newBrandId = brandName.toLowerCase().trim().replace(/\s+/g, "-");

    // Generate mission/vision/promise if not provided
    const essence = generateEssence(brandName, description);
    const finalMission = mission.trim() || essence.mission;
    const finalVision = vision.trim() || essence.vision;
    const finalPromise = promise.trim() || essence.promise;

    const newBrand: Brand = {
      id: newBrandId,
      name: brandName,
      description: description,
      logoUrl: logoBase64 || undefined,
      symbolUrl: symbolBase64 || undefined,
      logoReverseUrl: logoReverseBase64 || undefined,
      symbolReverseUrl: symbolReverseBase64 || undefined,
      mission: finalMission,
      vision: finalVision,
      promise: finalPromise,
      customDomain: customDomain.trim() || undefined,
      values: [
        { name: "Inovação", description: "Busca constante por novas e melhores soluções." },
        { name: "Qualidade", description: "Entrega excelente em todas as etapas de trabalho." },
        { name: "Integridade", description: "Transparência e honestidade em nossas ações." },
        { name: "Foco no Cliente", description: "Colocar as necessidades do usuário final em primeiro lugar." },
      ],
      palette: {
        primary: [
          { name: `${brandName} Principal`, hex: primaryColor, role: "Cor principal da identidade da marca.", token: "--color-brand-primary" },
          { name: "Charcoal", hex: "#1A1A1A", role: "Wordmark e texto principal.", token: "--ink" },
        ],
        secondary: [
          { name: `${brandName} Secundária`, hex: secondaryColor, role: "Cor de suporte para elementos secundários.", token: "--color-brand-secondary" },
          { name: "Light Tint", hex: `${secondaryColor}22`, role: "Backgrounds suaves e realces.", token: "--color-brand-secondary-tint" },
          { name: "Dark Shade", hex: "#111827", role: "Profundidade e dark UI.", token: "--color-brand-dark" },
        ],
        accent: [
          { name: `${brandName} Acento`, hex: accentColor, role: "Acento dinâmico para alertas e destakes.", token: "--color-brand-accent" },
          { name: "Cream Background", hex: "#FDFBF7", role: "Fundo alternativo suave.", token: "--color-brand-cream" },
        ],
        neutrals: [
          { name: "Claro", hex: "#FAFAFA" },
          { name: "Cinza Suave", hex: "#E5E5E5" },
          { name: "Cinza Médio", hex: "#737373" },
          { name: "Escuro", hex: "#171717" },
        ],
      },
    };

    // Save to localStorage (immediate) — will persist to deploy via Sync
    const currentMerged = getMergedBrands();
    const filtered = currentMerged.filter(b => b.id !== newBrandId);
    const updated = [...filtered, newBrand];
    localStorage.setItem("custom_brands", JSON.stringify(updated));

    // Persist to server (local custom-brands.json or KV store)
    saveBrandServer(newBrand).catch(err => {
      console.error("Failed to sync new brand to server:", err);
    });

    // Remove from deleted list if it was previously deleted
    const deletedIds: string[] = JSON.parse(localStorage.getItem("deleted_brand_ids") || "[]");
    localStorage.setItem("deleted_brand_ids", JSON.stringify(deletedIds.filter(id => id !== newBrandId)));

    setBrands([defaultMicrosistec, ...updated]);
    toast.success("Manual de Marca gerado com sucesso!");
    setShowModal(false);

    // Clear form
    setBrandName("");
    setDescription("");
    setLogoBase64("");
    setSymbolBase64("");
    setLogoReverseBase64("");
    setSymbolReverseBase64("");
    setMission("");
    setVision("");
    setPromise("");
    setCustomDomain("");

    // Redirect to the newly created manual
    router.navigate({ to: `/brand/${newBrandId}` });
  };

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (id === "microsistec") {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", id);
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (targetId === "microsistec") return;

    const dragId = e.dataTransfer.getData("text/plain");
    if (!dragId || dragId === targetId || dragId === "microsistec") return;

    try {
      const customBrands = getMergedBrands();
      const draggedIndex = customBrands.findIndex(b => b.id === dragId);
      const targetIndex = customBrands.findIndex(b => b.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return;

      const updated = [...customBrands];
      const [removed] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, removed);

      localStorage.setItem("custom_brands", JSON.stringify(updated));
      saveAllBrandsServer(updated).catch(err => {
        console.error("Failed to sync brand ordering to server:", err);
      });

      setBrands([defaultMicrosistec, ...updated]);
      toast.success("Ordem dos manuais atualizada!");
    } catch (err) {
      console.error(err);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const [darkMode, setDarkMode] = useState(false);

  // Export brand as JSON file
  const handleExportBrand = (brand: Brand) => {
    const exportData = { ...brand, _exportVersion: "1.0", _exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manual-${brand.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Manual "${brand.name}" exportado com sucesso!`);
  };

  // Import brand from JSON file
  const handleImportBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const data = JSON.parse(reader.result as string);

        // Validate required fields
        if (!data.id || !data.name || !data.palette) {
          toast.error("Arquivo inválido. Certifique-se de que é um manual exportado pelo sistema.");
          return;
        }

        // Strip export metadata
        const { _exportVersion, _exportDate, ...brandData } = data;

        // Prevent overwriting the default Microsistec
        if (brandData.id === "microsistec") {
          toast.error("Não é possível importar um manual com o ID 'microsistec'.");
          return;
        }

        const currentMerged = getMergedBrands();
        const existingIndex = currentMerged.findIndex(b => b.id === brandData.id);
        if (existingIndex >= 0) {
          currentMerged[existingIndex] = brandData as Brand;
        } else {
          currentMerged.push(brandData as Brand);
        }

        // Remove from deleted list if previously deleted
        const deletedIds: string[] = JSON.parse(localStorage.getItem("deleted_brand_ids") || "[]");
        localStorage.setItem("deleted_brand_ids", JSON.stringify(deletedIds.filter(id => id !== brandData.id)));

        localStorage.setItem("custom_brands", JSON.stringify(currentMerged));
        saveAllBrandsServer(currentMerged).catch(err => {
          console.error("Failed to sync imported brand to server:", err);
        });

        setBrands([defaultMicrosistec, ...currentMerged]);
        toast.success(`Manual "${brandData.name}" importado com sucesso!`);
      } catch {
        toast.error("Erro ao ler o arquivo. Verifique se é um JSON válido.");
      }
    };
    reader.readAsText(file);

    // Reset input so re-importing the same file works
    e.target.value = "";
  };

  // Download current merged brands as custom-brands.json for deployment
  const handleSyncForDeploy = () => {
    const merged = getMergedBrands();
    const blob = new Blob([JSON.stringify(merged, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-brands.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Arquivo baixado! Substitua public/custom-brands.json, commit e deploy.", { duration: 6000 });
  };

  // Sync theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") === "dark" ||
                   (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Modo escuro ativado");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Modo claro ativado");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      <Toaster position="top-center" duration={3000} richColors />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl shadow-lg">
              M
            </div>
            <div>
              <span className="font-display font-semibold tracking-tight text-lg block leading-none">Manual de Marca</span>
              <span className="text-[10px] text-muted-foreground font-mono">Gerador & Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
              title="Alternar Tema Escuro/Claro"
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Import */}
            <label
              className="inline-flex items-center gap-2 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground px-3 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer"
              title="Importar manual (.json)"
            >
              <FileUp className="w-4 h-4" />
              <span className="hidden sm:inline">Importar</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleImportBrand}
                className="hidden"
              />
            </label>

            {/* Sync for Deploy */}
            <button
              onClick={handleSyncForDeploy}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 px-3 py-2.5 text-sm font-medium transition-all duration-300"
              title="Baixar custom-brands.json para deploy permanente"
            >
              <CloudUpload className="w-4 h-4" />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2.5 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Novo Manual
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
            Central de <span className="text-primary">Identidade Visual</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Consulte manuais de marca existentes ou crie um novo manual completo em segundos a partir do upload de um logotipo.
          </p>
        </div>

        {/* Brand Manuals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              draggable={brand.id !== "microsistec"}
              onDragStart={(e) => handleDragStart(e, brand.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, brand.id)}
              onDragEnd={handleDragEnd}
              onDragEnter={() => {
                if (brand.id !== "microsistec") setDragOverId(brand.id);
              }}
              onDragLeave={() => setDragOverId(null)}
              className={`group rounded-2xl border p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                brand.id !== "microsistec" ? "cursor-grab active:cursor-grabbing hover:border-primary/50" : "hover:border-primary/30"
              } ${
                draggedId === brand.id ? "opacity-30 scale-[0.97] border-dashed border-border" : ""
              } ${
                dragOverId === brand.id ? "border-dashed border-primary bg-primary/5 scale-[1.01]" : "border-border bg-card"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-auto max-w-[150px] flex items-center">
                    <DynamicLogoMark
                      logoUrl={brand.logoUrl}
                      symbolUrl={brand.symbolUrl}
                      logoReverseUrl={brand.logoReverseUrl}
                      symbolReverseUrl={brand.symbolReverseUrl}
                      brandName={brand.name}
                      variant={darkMode ? "reverse" : "original"}
                      withWordmark={false}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    {brand.palette.primary.slice(0, 1).map((color) => (
                      <span
                        key={color.hex}
                        className="w-4 h-4 rounded-full border border-border/20 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                    {brand.palette.secondary?.slice(0, 1).map((color) => (
                      <span
                        key={color.hex}
                        className="w-4 h-4 rounded-full border border-border/20 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-2xl group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase">Manual v1.0</span>
                  {brand.id !== "microsistec" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleExportBrand(brand); }}
                      className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                      title="Exportar manual como JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <Link
                  to="/brand/$brandId"
                  params={{ brandId: brand.id }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all"
                >
                  Ver Manual
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {/* Create New brand card */}
          <div
            onClick={() => setShowModal(true)}
            className="rounded-2xl border border-dashed border-border/80 hover:border-primary/60 bg-card/40 hover:bg-card/80 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl">Criar Novo Manual</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">
              Faça upload do logo e gere a identidade visual instantaneamente.
            </p>
          </div>
        </div>
      </main>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-3xl font-display font-bold tracking-tight">Criar Identidade Visual</h2>
            <p className="text-sm text-muted-foreground mt-1">Insira os dados da sua marca para gerar um manual completo de identidade visual.</p>

            <form onSubmit={handleCreateBrand} className="mt-8 space-y-6">
              {/* Logo & Symbol Upload Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">Logotipo Completo <span className="text-red-500 font-semibold">*</span></label>
                  <div className="border-2 border-dashed border-border/80 hover:border-primary/55 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-muted/20 relative min-h-[140px]">
                    {logoBase64 ? (
                      <div className="flex flex-col items-center">
                        <img src={logoBase64} alt="Preview Logo" className="max-h-16 object-contain mb-3" />
                        <button
                          type="button"
                          onClick={() => setLogoBase64("")}
                          className="text-xs font-medium text-destructive hover:underline"
                        >
                          Remover Logo
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs font-medium">Selecione o logotipo completo</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">SVG, PNG ou JPG</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">Símbolo Isolado (Ícone) <span className="text-red-500 font-semibold">*</span></label>
                  <div className="border-2 border-dashed border-border/80 hover:border-primary/55 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-muted/20 relative min-h-[140px]">
                    {symbolBase64 ? (
                      <div className="flex flex-col items-center">
                        <img src={symbolBase64} alt="Preview Símbolo" className="max-h-16 object-contain mb-3" />
                        <button
                          type="button"
                          onClick={() => setSymbolBase64("")}
                          className="text-xs font-medium text-destructive hover:underline"
                        >
                          Remover Símbolo
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs font-medium">Selecione apenas o símbolo</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">Usado em ícones/Business Card</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSymbolUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Logo & Symbol REVERSE Upload Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">Logotipo Reverso <span className="text-red-500 font-semibold">*</span></label>
                  <div className="border-2 border-dashed border-border/80 hover:border-primary/55 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-muted/20 relative min-h-[140px]">
                    {logoReverseBase64 ? (
                      <div className="flex flex-col items-center">
                        <img src={logoReverseBase64} alt="Preview Logo Reverso" className="max-h-16 object-contain mb-3 bg-neutral-900 p-2 rounded" />
                        <button
                          type="button"
                          onClick={() => setLogoReverseBase64("")}
                          className="text-xs font-medium text-destructive hover:underline"
                        >
                          Remover Logo Reversa
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs font-medium">Selecione o logotipo reverso</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">SVG, PNG ou JPG (Fundo transparente)</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoReverseUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">Símbolo Reverso (Ícone Reverso) <span className="text-red-500 font-semibold">*</span></label>
                  <div className="border-2 border-dashed border-border/80 hover:border-primary/55 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-muted/20 relative min-h-[140px]">
                    {symbolReverseBase64 ? (
                      <div className="flex flex-col items-center">
                        <img src={symbolReverseBase64} alt="Preview Símbolo Reverso" className="max-h-16 object-contain mb-3 bg-neutral-900 p-2 rounded" />
                        <button
                          type="button"
                          onClick={() => setSymbolReverseBase64("")}
                          className="text-xs font-medium text-destructive hover:underline"
                        >
                          Remover Símbolo Reverso
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs font-medium">Selecione o símbolo reverso</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">SVG, PNG ou JPG</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSymbolReverseUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Nome da Marca <span className="text-red-500 font-semibold">*</span></label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Ex: Microsistec"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Apresentação / Descrição <span className="text-red-500 font-semibold">*</span></label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Tecnologia com precisão e clareza visual..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  />
                </div>
              </div>

              {/* Custom Domain Input */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                  Domínio Personalizado <span className="text-[10px] text-muted-foreground font-sans lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="Ex: manual.minhamarca.com.br"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Insira o domínio para este manual. Aponte um CNAME de seu subdomínio para este portal para habilitar.
                </p>
              </div>


              {/* Essence (Mission, Vision, Promise) */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-primary border-b border-border/80 pb-2">Essência e Diretrizes</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">Missão</label>
                    <textarea
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      placeholder="Ex: Simplificar o dia a dia corporativo..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">Visão</label>
                    <textarea
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      placeholder="Ex: Ser a líder nacional em inovação digital..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">Promessa</label>
                    <textarea
                      value={promise}
                      onChange={(e) => setPromise(e.target.value)}
                      placeholder="Ex: Entregar com qualidade e agilidade..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Paleta Cromática */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-primary border-b border-border/80 pb-2">Paleta de Cores</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <label className="text-[11px] font-semibold mb-2">Principal (Teal/Brand)</label>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-border p-0.5 bg-background"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[11px] font-semibold mb-2">Secundária</label>
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-border p-0.5 bg-background"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[11px] font-semibold mb-2">Acento</label>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-border p-0.5 bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-medium transition-all shadow-md"
                >
                  Gerar Manual de Marca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
