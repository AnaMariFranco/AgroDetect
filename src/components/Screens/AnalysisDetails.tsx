import { Microscope, ArrowLeft, LogOut, Upload, CreditCard, Download, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalysisDetailsProps {
  analysisId: string | null;
  onNavigate: (page: 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report') => void;
  onLogout: () => void;
  onGenerateReport: (id: string) => void;
}


const speciesDistribution = [
  { name: 'Meloidogyne incognita', value: 487, color: '#10b981' },
  { name: 'Pratylenchus brachyurus', value: 342, color: '#34d399' },
  { name: 'Heterodera glycines', value: 256, color: '#6ee7b7' },
  { name: 'Rotylenchulus reniformis', value: 162, color: '#a7f3d0' },
];

const depthDistribution = [
  { depth: '0-10cm', count: 523 },
  { depth: '10-20cm', count: 398 },
  { depth: '20-30cm', count: 214 },
  { depth: '30-40cm', count: 112 },
];

const temporalData = [
  { date: '10/10', count: 1156 },
  { date: '12/10', count: 1089 },
  { date: '14/10', count: 1234 },
  { date: '16/10', count: 1178 },
  { date: '18/10', count: 1247 },
];

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

export function AnalysisDetails({ analysisId, onNavigate, onLogout, onGenerateReport }: AnalysisDetailsProps) {
  if (!analysisId) {
    return null;
  }

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

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-emerald-950 mb-2">Amostra Fazenda Sul - Lote A</h1>
            <div className="flex items-center gap-4">
              <span className="text-emerald-700">Data: 18/10/2025</span>
              <span className="text-emerald-700">•</span>
              <span className="text-emerald-700">ID: #{analysisId}</span>
              <Badge className="bg-red-100 text-red-700 border-red-200">Alto Risco</Badge>
            </div>
          </div>
          <Button
            onClick={() => onGenerateReport(analysisId)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Total de Nematoides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-emerald-950">1,247</div>
              <p className="text-emerald-600">por 100g de solo</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Espécies Identificadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-emerald-950">4</div>
              <p className="text-emerald-600">espécies distintas</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Índice de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-red-600">8.7/10</div>
              <p className="text-emerald-600">Alto risco</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-700">Profundidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-emerald-950">0-40cm</div>
              <p className="text-emerald-600">analisados</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-200 bg-red-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-red-900 mb-2">Alerta: Alta Infestação Detectada</h3>
                <p className="text-red-700 mb-4">
                  A concentração de nematoides está acima do limite crítico para cultivo. 
                  Recomenda-se intervenção imediata com tratamento do solo.
                </p>
                <div className="space-y-2 text-red-700">
                  <p>• Aplicar nematicida biológico Paecilomyces lilacinus</p>
                  <p>• Implementar rotação de culturas com espécies não hospedeiras</p>
                  <p>• Aumentar matéria orgânica no solo</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList className="bg-emerald-50">
            <TabsTrigger value="distribution" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Distribuição por Espécie
            </TabsTrigger>
            <TabsTrigger value="depth" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Distribuição por Profundidade
            </TabsTrigger>
            <TabsTrigger value="temporal" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Evolução Temporal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="distribution">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Distribuição por Espécie</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={speciesDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {speciesDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Contagem por Espécie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {speciesDistribution.map((species, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-emerald-700">
                          <span>{species.name}</span>
                          <span>{species.value} nematoides</span>
                        </div>
                        <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(species.value / 1247) * 100}%`,
                              backgroundColor: species.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="depth">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Distribuição por Profundidade do Solo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={depthDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="depth" stroke="#059669" />
                    <YAxis stroke="#059669" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #10b981',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#10b981" name="Contagem de Nematoides" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="temporal">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Evolução Temporal da População</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={temporalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="date" stroke="#059669" />
                    <YAxis stroke="#059669" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #10b981',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Contagem de Nematoides"
                      dot={{ fill: '#10b981', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-emerald-100 mt-8">
          <CardHeader>
            <CardTitle className="text-emerald-950">Detalhes da Amostra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-emerald-700 mb-4">Informações de Coleta</h4>
                <div className="space-y-3 text-emerald-950">
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Localização:</span>
                    <span>Fazenda Sul - Setor Norte</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Data de Coleta:</span>
                    <span>18/10/2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Profundidade:</span>
                    <span>0-40 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Tipo de Solo:</span>
                    <span>Latossolo Vermelho</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-emerald-700 mb-4">Parâmetros de Análise</h4>
                <div className="space-y-3 text-emerald-950">
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Método:</span>
                    <span>Flutuação Centrífuga</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Magnificação:</span>
                    <span>40x - 400x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Imagens Analisadas:</span>
                    <span>127 imagens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Confiança IA:</span>
                    <span>98.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
