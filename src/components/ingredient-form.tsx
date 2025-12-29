'use client';

import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Button } from './ui/button';
import { Paperclip, Send, Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

// Typewriter effect hook
const useTypewriter = (texts: string[], speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return displayText;
};

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
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  
  const { toast } = useToast();
  
  const typewriterText = useTypewriter([
    "Paste ingredient list or upload a label photo...",
    "What's in your food?",
    "Scan a nutrition label...",
    "Get ingredient insights..."
  ], 80);

  useEffect(() => {
    if (!isPending) {
      // Don't auto-clear the form in this new layout
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && fileInputRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.png", { type: "image/png" });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current!.files = dataTransfer.files;
            setImagePreview(canvas.toDataURL('image/png'));
          }
        }, 'image/png');
      }
      setIsCameraOpen(false);
    }
  };
  
  const handleRemoveImage = () => {
      setImagePreview(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  const hasContent = !!text || !!(fileInputRef.current?.files && fileInputRef.current.files.length > 0 && fileInputRef.current.files[0].size > 0);

  return (
    <Card className="w-full bg-card/40 border-primary/10 shadow-lg shadow-primary/5 p-4 space-y-4">
      {imagePreview && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30 mx-auto">
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      )}
      <form ref={formRef} action={formAction} className="relative space-y-4">
        <div className="relative flex items-center w-full">
            <Textarea
              name="ingredients"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={typewriterText}
              className={cn(
                "w-full rounded-xl bg-background/50 border-primary/20 p-4 pr-32 text-base resize-none focus:ring-0 focus:outline-none focus:border-primary/50 transition-colors neon-input placeholder:!text-white placeholder:!opacity-100",
                "min-h-[56px]"
              )}
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
                        <Button type="button" variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
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

                <Button type="button" variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground" onClick={() => fileInputRef.current?.click()}>
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
            </div>
             <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="flex flex-col items-center gap-4">
            <Button 
                type="submit"
                size="lg" 
                disabled={isPending || !hasContent} 
                className="w-full sm:w-auto bg-primary/90 hover:bg-primary text-primary-foreground shadow-md shadow-primary/20"
            >
                <Send className="h-4 w-4 mr-2" />
                Analyze
            </Button>
            <p className="text-xs text-center text-neutral-500">
                Ingredient Insights AI can make mistakes. Consider checking important information.
            </p>
        </div>
      </form>
    </Card>
  );
}
