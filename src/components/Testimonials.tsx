import { useState, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "Cutting the bullshit, It's a Value of Money, worth every penny",
    author: "Alex Johnson",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    quote: "As a frequent traveler, I need reliable headphones with great battery life. TSonic delivers exactly that - I can go through multiple flights without needing to recharge.",
    author: "Sarah Williams",
    role: "Blogger",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The comfort level is incredible. I can wear these headphones all day while working, and they never hurt my ears or feel too tight. Absolutely worth every penny.",
    author: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    quote: "I recently purchased both regular and prescription glasses via TSonic, and I'm highly satisfied! The quality is top-notch, and the fit is perfect. They also ensured my eye number was accurately checked, providing me with the best lenses for clear vision. The staff was professional and helpful, making the entire process smooth and hassle-free. Highly recommend for anyone looking for quality eyewear and excellent service!",
    author: "Priya Patel",
    role: "Bussiness Owner",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    quote: "I've tried many premium Smart Eyewear, but these stand out for their build quality and durability. They feel like they'll last for years, which justifies the investment.",
    author: "James Wilson",
    role: "Tech Reviewer",
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];

const TestimonialCard = memo(({ testimonial, isActive }: { testimonial: any, isActive: boolean }) => (
  <div
    className={cn(
      "transition-opacity duration-300",
      isActive ? "block opacity-100" : "hidden opacity-0"
    )}
  >
    <blockquote className="text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-4">
      "{testimonial.quote}"
    </blockquote>
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
        <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
      </div>
    </div>
  </div>
));

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((current + 1) % testimonials.length);
  }, [current]);

  const previous = useCallback(() => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="w-full py-8 sm:py-16 bg-gradient-to-b from-green-50 to-purple-50">
      <div className="container px-3 sm:px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
              What Our Customers Say
            </h2>
            <p className="max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Discover why audiophiles around the world choose TSonic Eyewear
            </p>
          </div>
        </div>
        <div className="mx-auto mt-6 sm:mt-8 max-w-4xl">
          <div className="relative overflow-hidden rounded-lg border bg-background p-4 sm:p-6 shadow-sm">
            <div className="absolute right-4 top-4 text-muted-foreground">
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 opacity-20" />
            </div>
            <div className="grid gap-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  testimonial={testimonial}
                  isActive={index === current}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={previous}
              className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === current ? "bg-primary" : "bg-muted-foreground/20"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 