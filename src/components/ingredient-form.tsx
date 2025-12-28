'use client';

import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Button } from './ui/button';
import { Paperclip, Send, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export function IngredientForm({
  formAction,
  isPending,
}: {
  formAction: (payload: FormData) => void;
  isPending: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    if (!isPending) {
      formRef.current?.reset();
      setText('');
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isPending]);

  useEffect(() => {
    if (isCameraOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
          setIsCameraOpen(false);
        }
      };
      getCameraPermission();

      return () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [isCameraOpen, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/png');
        
        fetch(dataUri)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "capture.png", { type: "image/png" });
            setImageFile(file);
            setImagePreview(dataUri);
          });
      }
      setIsCameraOpen(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    if (imageFile) {
        formData.set('image', imageFile);
    }
    formAction(formData);
  };
  
  const handleRemoveImage = () => {
      setImageFile(null);
      setImagePreview(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  return (
    <div className="w-full space-y-4">
      {imagePreview && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30">
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleRemoveImage}
          >
            <Send className="h-3 w-3" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center w-full">
            <Textarea
              name="ingredients"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste an ingredient list or upload a photo to understand what you're really eating."
              className="w-full rounded-xl bg-card/80 border-primary/20 p-4 pr-28 text-base resize-none focus:ring-0 focus:outline-none focus:border-primary/50 transition-colors"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" variant="ghost" size="icon">
                            <Camera className="h-5 w-5" />
                            <span className="sr-only">Use Camera</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Use Camera</DialogTitle>
                        </DialogHeader>
                         <div className="space-y-4">
                            <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline/>
                            {hasCameraPermission === false && (
                                <Alert variant="destructive">
                                    <AlertTitle>Camera Access Required</AlertTitle>
                                    <AlertDescription>
                                        Please allow camera access to use this feature.
                                    </AlertDescription>
                                </Alert>
                            )}
                            <div className="flex justify-center gap-4">
                                <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>
                                    <Camera className="mr-2" /> Capture
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-5 w-5" />
                    <span className="sr-only">Upload Image</span>
                </Button>
                <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <Button type="submit" size="icon" disabled={isPending || (!text && !imageFile)} className="bg-accent text-accent-foreground rounded-full">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Analyze</span>
                </Button>
            </div>
             <canvas ref={canvasRef} className="hidden" />
        </div>
      </form>
      <p className="text-xs text-center text-neutral-500">
        Ingredient Insights AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
