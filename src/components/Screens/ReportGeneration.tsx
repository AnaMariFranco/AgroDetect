import { Microscope, ArrowLeft, LogOut, Upload, CreditCard, Download, FileText, Check, Printer, Mail, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';

interface ReportGenerationProps {
  analysisId: string | null;
  onNavigate: (page: 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report') => void;
  onLogout: () => void;
}

export function ReportGeneration({ analysisId, onNavigate, onLogout }: ReportGenerationProps) {
  const handleDownload = () => {
    // Simulação PDF 
    alert('Relatório baixado com sucesso!');
  };

  const handleEmail = () => {
    // Simulação envio por email
    alert('Relatório enviado por email!');
  };

  const handlePrint = () => {
    // Simulação de print
    window.print();
  };

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('analysis')}
          className="mb-6 text-emerald-700 hover:bg-emerald-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Análise
        </Button>

        <div className="mb-8">
          <h1 className="text-emerald-950 mb-2">Geração de Relatório</h1>
          <p className="text-emerald-700">
            Configure e baixe o relatório completo da análise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Tipo de Relatório</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="complete">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <RadioGroupItem value="complete" id="complete" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="complete" className="text-emerald-950 cursor-pointer">
                          Relatório Completo
                        </Label>
                        <p className="text-emerald-600 mt-1">
                          Inclui todos os dados, gráficos, análises detalhadas e recomendações
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-emerald-100">
                      <RadioGroupItem value="summary" id="summary" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="summary" className="text-emerald-950 cursor-pointer">
                          Resumo Executivo
                        </Label>
                        <p className="text-emerald-600 mt-1">
                          Versão resumida com os principais resultados e conclusões
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-emerald-100">
                      <RadioGroupItem value="technical" id="technical" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="technical" className="text-emerald-950 cursor-pointer">
                          Relatório Técnico
                        </Label>
                        <p className="text-emerald-600 mt-1">
                          Dados científicos detalhados e metodologia de análise
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Conteúdo do Relatório</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="summary-data" defaultChecked />
                    <Label htmlFor="summary-data" className="text-emerald-700 cursor-pointer">
                      Resumo de Dados e Estatísticas
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="species-distribution" defaultChecked />
                    <Label htmlFor="species-distribution" className="text-emerald-700 cursor-pointer">
                      Distribuição por Espécie
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="depth-analysis" defaultChecked />
                    <Label htmlFor="depth-analysis" className="text-emerald-700 cursor-pointer">
                      Análise por Profundidade
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="temporal-evolution" defaultChecked />
                    <Label htmlFor="temporal-evolution" className="text-emerald-700 cursor-pointer">
                      Evolução Temporal
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="risk-assessment" defaultChecked />
                    <Label htmlFor="risk-assessment" className="text-emerald-700 cursor-pointer">
                      Avaliação de Risco
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="recommendations" defaultChecked />
                    <Label htmlFor="recommendations" className="text-emerald-700 cursor-pointer">
                      Recomendações de Manejo
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="images" />
                    <Label htmlFor="images" className="text-emerald-700 cursor-pointer">
                      Imagens Microscópicas Originais
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="methodology" />
                    <Label htmlFor="methodology" className="text-emerald-700 cursor-pointer">
                      Metodologia Científica
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="references" />
                    <Label htmlFor="references" className="text-emerald-700 cursor-pointer">
                      Referências Bibliográficas
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Opções de Formatação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="logo" defaultChecked />
                    <Label htmlFor="logo" className="text-emerald-700 cursor-pointer">
                      Incluir logo da empresa
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="watermark" />
                    <Label htmlFor="watermark" className="text-emerald-700 cursor-pointer">
                      Adicionar marca d'água
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="color" defaultChecked />
                    <Label htmlFor="color" className="text-emerald-700 cursor-pointer">
                      Gráficos coloridos (recomendado)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="page-numbers" defaultChecked />
                    <Label htmlFor="page-numbers" className="text-emerald-700 cursor-pointer">
                      Numeração de páginas
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border-2 border-emerald-200 rounded-lg p-6 mb-4 aspect-[8.5/11]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Microscope className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-emerald-950">AgroDetect</div>
                    </div>

                    <div>
                      <h3 className="text-emerald-950 mb-1">Relatório de Análise</h3>
                      <p className="text-emerald-600">Amostra Fazenda Sul - Lote A</p>
                    </div>

                    <div className="space-y-2 text-emerald-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>18/10/2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>ID: #{analysisId}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded h-24 flex items-center justify-center">
                      <span className="text-emerald-600">Gráficos e Análises</span>
                    </div>

                    <div className="text-center pt-4 border-t border-emerald-100 text-emerald-600">
                      Página 1 de 12
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-950">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>

                <Button
                  onClick={handleEmail}
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por Email
                </Button>

                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>

                <Separator className="my-4 bg-emerald-100" />

                <Button
                  variant="ghost"
                  onClick={() => onNavigate('analysis')}
                  className="w-full text-emerald-700 hover:bg-emerald-50"
                >
                  Cancelar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-950 mb-1">Relatório Profissional</p>
                    <p className="text-emerald-600">
                      O relatório incluirá todos os dados científicos e análises detalhadas da amostra.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
