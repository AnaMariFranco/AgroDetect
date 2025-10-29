import { useState } from 'react';
import { Microscope, ArrowLeft, LogOut, Upload, CreditCard, Check, Zap, Building2, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChatSupport } from './ChatSupport';

interface PricingPlansProps {
  onNavigate: (page: 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report') => void;
  onLogout: () => void;
}

const plans = [
  {
    name: 'Básico',
    icon: Zap,
    price: 'R$ 199',
    period: '/mês',
    description: 'Ideal para pequenos produtores e testes iniciais',
    features: [
      '25 análises por mês',
      'Identificação de até 10 espécies',
      'Relatórios básicos em PDF',
      'Suporte por email',
      'Armazenamento de 6 meses',
      'Dashboard básico',
    ],
    highlighted: false,
    color: 'emerald',
  },
  {
    name: 'Profissional',
    icon: Building2,
    price: 'R$ 499',
    period: '/mês',
    description: 'Para produtores médios e consultores agrícolas',
    features: [
      '100 análises por mês',
      'Identificação de todas as espécies',
      'Relatórios avançados e customizáveis',
      'Suporte prioritário',
      'Armazenamento ilimitado',
      'Dashboard completo com gráficos',
      'API de integração',
      'Análise de tendências temporais',
    ],
    highlighted: true,
    color: 'emerald',
    badge: 'Mais Popular',
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: 'Personalizado',
    period: '',
    description: 'Soluções corporativas para grandes operações',
    features: [
      'Análises ilimitadas',
      'Identificação de todas as espécies',
      'Relatórios personalizados',
      'Suporte 24/7 dedicado',
      'Armazenamento ilimitado',
      'Dashboard customizado',
      'API completa',
      'Treinamento da equipe',
      'Integração com sistemas existentes',
      'Consultoria especializada',
    ],
    highlighted: false,
    color: 'emerald',
  },
];

export function PricingPlans({ onNavigate, onLogout }: PricingPlansProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-emerald-950">AgroDetect</span>
            </div>
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onNavigate('dashboard')}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('upload')}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('pricing')}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Planos
              </Button>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className="mb-6 text-emerald-700 hover:bg-emerald-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-emerald-950 mb-4">Planos e Assinaturas</h1>
          <p className="text-emerald-700 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades de análise de nematoides.
            Todos os planos incluem acesso completo à plataforma e atualizações contínuas.
          </p>
        </div>

        <Card className="border-emerald-200 bg-emerald-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-emerald-950 mb-1">Plano Atual: Profissional</h3>
                  <p className="text-emerald-700">
                    Próxima renovação: 18/11/2025 • 75 de 100 análises utilizadas
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
              >
                Gerenciar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.highlighted
                    ? 'border-emerald-500 shadow-lg shadow-emerald-100 scale-105'
                    : 'border-emerald-100'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-950 mb-2">{plan.name}</CardTitle>
                  <p className="text-emerald-600">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-emerald-950">{plan.price}</span>
                    {plan.period && <span className="text-emerald-600">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-emerald-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {plan.name === 'Profissional' ? 'Plano Atual' : plan.name === 'Enterprise' ? 'Contatar Vendas' : 'Selecionar Plano'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-emerald-950">Comparação Completa de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-100">
                    <th className="text-left py-4 px-4 text-emerald-950">Recurso</th>
                    <th className="text-center py-4 px-4 text-emerald-950">Básico</th>
                    <th className="text-center py-4 px-4 text-emerald-950">Profissional</th>
                    <th className="text-center py-4 px-4 text-emerald-950">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-emerald-50">
                    <td className="py-4 px-4 text-emerald-700">Análises mensais</td>
                    <td className="text-center py-4 px-4 text-emerald-950">25</td>
                    <td className="text-center py-4 px-4 text-emerald-950">100</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-emerald-50">
                    <td className="py-4 px-4 text-emerald-700">Espécies identificadas</td>
                    <td className="text-center py-4 px-4 text-emerald-950">10</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Todas</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Todas + Custom</td>
                  </tr>
                  <tr className="border-b border-emerald-50">
                    <td className="py-4 px-4 text-emerald-700">Armazenamento</td>
                    <td className="text-center py-4 px-4 text-emerald-950">6 meses</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Ilimitado</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-emerald-50">
                    <td className="py-4 px-4 text-emerald-700">API de Integração</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-emerald-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-emerald-50">
                    <td className="py-4 px-4 text-emerald-700">Suporte</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Email</td>
                    <td className="text-center py-4 px-4 text-emerald-950">Prioritário</td>
                    <td className="text-center py-4 px-4 text-emerald-950">24/7 Dedicado</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-emerald-700">Consultoria especializada</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-emerald-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-emerald-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-emerald-950 mb-4">Dúvidas sobre os planos?</h2>
          <p className="text-emerald-700 mb-6">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano para suas necessidades
          </p>
          <Button 
            onClick={() => setIsChatOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Falar com Consultor
          </Button>
        </div>
      </main>

      {/* Chat de suporte */}
      <ChatSupport isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
