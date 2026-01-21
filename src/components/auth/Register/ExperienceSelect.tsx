// Cria um componente de seleção de experiência para o formulário de registro, permitindo que o usuário escolha seu nível de experiência no mercado imobiliário.
interface ExperienceSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const ExperienceSelect = ({
  value,
  onChange,
  error,
}: ExperienceSelectProps) => (
  <div className="mb-4">
    <label
      htmlFor="experience-select"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Experiência no Mercado
    </label>
    <select
      id="experience-select"
      name="experience"
      aria-label="Selecione sua experiência no mercado"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-lg border ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      } bg-white text-gray-900 focus:outline-none focus:ring-2`}
    >
      <option value="">Selecione sua experiência</option>
      <option value="less-1">Menos de 1 ano</option>
      <option value="1-3">1-3 anos</option>
      <option value="3-5">3-5 anos</option>
      <option value="5-10">5-10 anos</option>
      <option value="more-10">Mais de 10 anos</option>
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default ExperienceSelect;
