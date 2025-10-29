import { useState } from 'react';
import { Microscope, Upload, FileImage, X, CheckCircle, ArrowLeft, LogOut, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UploadSampleProps {
  onNavigate: (page: 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report') => void;
  onLogout: () => void;
}

export function UploadSample({ onNavigate, onLogout }: UploadSampleProps) {
  const [sampleName, setSampleName] = useState('');
  const [sampleLocation, setSampleLocation] = useState('');
  const [sampleDepth, setSampleDepth] = useState('');
  const [sampleNotes, setSampleNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    // Simula o progresso de upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleNewUpload = () => {
    setSampleName('');
    setSampleLocation('');
    setSampleDepth('');
    setSampleNotes('');
    setUploadedFiles([]);
    setUploadProgress(0);
    setUploadComplete(false);
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className="mb-6 text-emerald-700 hover:bg-emerald-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Button>

        {uploadComplete ? (
          // Successo
          <Card className="border-emerald-100">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-emerald-950 mb-4">Amostra Enviada com Sucesso!</h2>
              <p className="text-emerald-700 mb-8">
                Sua amostra está sendo processada. O tempo estimado de análise é de 15-30 minutos.
                Você receberá uma notificação quando o resultado estiver disponível.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Ver Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNewUpload}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Nova Amostra
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-950">Upload de Nova Amostra</CardTitle>
              <p className="text-emerald-700">
                Envie imagens microscópicas das amostras de solo para análise automatizada
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sample-name" className="text-emerald-950">
                      Nome da Amostra *
                    </Label>
                    <Input
                      id="sample-name"
                      placeholder="Ex: Fazenda Sul - Lote A"
                      value={sampleName}
                      onChange={(e) => setSampleName(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sample-location" className="text-emerald-950">
                        Localização *
                      </Label>
                      <Input
                        id="sample-location"
                        placeholder="Ex: Setor Norte"
                        value={sampleLocation}
                        onChange={(e) => setSampleLocation(e.target.value)}
                        className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sample-depth" className="text-emerald-950">
                        Profundidade (cm) *
                      </Label>
                      <Select value={sampleDepth} onValueChange={setSampleDepth} required>
                        <SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10">0-10 cm</SelectItem>
                          <SelectItem value="10-20">10-20 cm</SelectItem>
                          <SelectItem value="20-30">20-30 cm</SelectItem>
                          <SelectItem value="30-40">30-40 cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sample-notes" className="text-emerald-950">
                      Observações
                    </Label>
                    <Textarea
                      id="sample-notes"
                      placeholder="Informações adicionais sobre a amostra..."
                      value={sampleNotes}
                      onChange={(e) => setSampleNotes(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-emerald-950">Imagens Microscópicas *</Label>
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors bg-emerald-50/30">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required={uploadedFiles.length === 0}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                        <FileImage className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="text-emerald-950 mb-2">
                        Clique para selecionar ou arraste imagens aqui
                      </p>
                      <p className="text-emerald-600">
                        Formatos aceitos: JPG, PNG, TIFF (máx. 10MB por arquivo)
                      </p>
                    </label>
                  </div>

                  {/* Lista de arquivos enviados */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                        >
                          <div className="flex items-center gap-3">
                            <FileImage className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-950">{file.name}</span>
                            <span className="text-emerald-600">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Progresso de envio */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-emerald-700">
                      <span>Enviando amostra...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2 bg-emerald-100" />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isUploading || uploadedFiles.length === 0}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? 'Enviando...' : 'Enviar para Análise'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onNavigate('dashboard')}
                    disabled={isUploading}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
