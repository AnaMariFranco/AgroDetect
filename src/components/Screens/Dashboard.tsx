import { Microscope, Upload, FileText, CreditCard, LogOut, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report') => void;
  onLogout: () => void;
  onViewAnalysis: (id: string) => void;
  onGenerateReport: (id: string) => void;
}

const mockAnalyses = [
  {
    id: '1',
    sampleName: 'Amostra Fazenda Sul - Lote A',
    date: '18/10/2025',
    status: 'completed',
    nematodes: 1247,
    risk: 'high',
  },
  {
    id: '2',
    sampleName: 'Amostra Fazenda Norte - Lote B',
    date: '17/10/2025',
    status: 'processing',
    nematodes: null,
    risk: null,
  },
  {
    id: '3',
    sampleName: 'Amostra Fazenda Leste - Lote C',
    date: '15/10/2025',
    status: 'completed',
    nematodes: 523,
    risk: 'medium',
  },
  {
    id: '4',
    sampleName: 'Amostra Fazenda Oeste - Lote D',
    date: '14/10/2025',
    status: 'completed',
    nematodes: 189,
    risk: 'low',
  },
];

export function Dashboard({ onNavigate, onLogout, onViewAnalysis, onGenerateReport }: DashboardProps) {
  const completedAnalyses = mockAnalyses.filter(a => a.status === 'completed').length;
  const processingAnalyses = mockAnalyses.filter(a => a.status === 'processing').length;

  const getRiskBadge = (risk: string | null) => {
    if (!risk) return null;
    const variants = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-amber-100 text-amber-700 border-amber-200',
      low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    const labels = {
      high: 'Alto Risco',
      medium: 'Risco Médio',
      low: 'Baixo Risco',
    };
    return (
      <Badge className={variants[risk as keyof typeof variants]}>
        {labels[risk as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    if (status === 'processing') return <Clock className="w-5 h-5 text-amber-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

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
        <div className="mb-8">
          <h1 className="text-emerald-950 mb-2">Painel de Análises</h1>
          <p className="text-emerald-700">
            Bem-vindo ao sistema de identificação automatizada de nematoides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Total de Análises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-emerald-950">{mockAnalyses.length}</span>
                <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-emerald-950">{completedAnalyses}</span>
                <CheckCircle className="w-5 h-5 text-emerald-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Em Processamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-emerald-950">{processingAnalyses}</span>
                <Clock className="w-5 h-5 text-amber-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-emerald-950">Professional</div>
              <Progress value={75} className="mt-2 h-2 bg-emerald-200" />
              <p className="text-emerald-600 mt-1">75 de 100 análises</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="border-emerald-100 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2">Nova Análise de Amostra</h3>
                  <p className="text-emerald-50">
                    Faça upload de novas amostras de solo para identificação automática de nematoides
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate('upload')}
                  className="bg-white text-emerald-600 hover:bg-emerald-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload de Amostra
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-emerald-950">Análises Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-emerald-100 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(analysis.status)}
                    <div className="flex-1">
                      <div className="text-emerald-950 mb-1">{analysis.sampleName}</div>
                      <div className="text-emerald-600">{analysis.date}</div>
                    </div>
                    {analysis.nematodes !== null && (
                      <div className="text-center px-4">
                        <div className="text-emerald-950">{analysis.nematodes}</div>
                        <div className="text-emerald-600">nematoides</div>
                      </div>
                    )}
                    {analysis.status === 'processing' && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        Processando...
                      </Badge>
                    )}
                    {analysis.risk && getRiskBadge(analysis.risk)}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {analysis.status === 'completed' && (
                      <>
                        <Button
                          onClick={() => onViewAnalysis(analysis.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onGenerateReport(analysis.id)}
                          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Relatório
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
