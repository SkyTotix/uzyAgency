/**
 * Alternativa gratuita a SplitText de GSAP
 * Divide texto en caracteres, palabras o líneas para animaciones
 */

export interface TextSplitOptions {
  type: 'chars' | 'words' | 'lines' | 'chars,words' | 'chars,lines' | 'words,lines' | 'chars,words,lines';
  absolute?: boolean;
}

export interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export class TextSplitter {
  private element: HTMLElement;
  private originalHTML: string;
  private options: TextSplitOptions;
  private chars: HTMLElement[] = [];
  private words: HTMLElement[] = [];
  private lines: HTMLElement[] = [];

  constructor(element: HTMLElement, options: TextSplitOptions) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    this.options = options;
    
    this.split();
  }

  private split(): void {
    const { type } = this.options;
    
    // Guardar el texto original antes de limpiar
    const originalText = this.element.textContent || '';
    
    // Limpiar contenido anterior
    this.element.innerHTML = '';
    
    // Dividir según el tipo especificado
    if (type.includes('chars')) {
      this.splitChars(originalText);
    } else if (type.includes('words')) {
      this.splitWords(originalText);
    } else if (type.includes('lines')) {
      this.splitLines(originalText);
    }
  }

  private splitChars(text: string): void {
    const chars = text.split('');
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      span.style.display = 'inline-block';
      span.style.position = this.options.absolute ? 'absolute' : 'relative';
      span.classList.add('split-char');
      span.setAttribute('data-char-index', index.toString());
      
      this.element.appendChild(span);
      this.chars.push(span);
    });
  }

  private splitWords(text: string): void {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.position = this.options.absolute ? 'absolute' : 'relative';
      span.classList.add('split-word');
      span.setAttribute('data-word-index', index.toString());
      
      this.element.appendChild(span);
      this.words.push(span);
      
      // Agregar espacio entre palabras (excepto la última)
      if (index < words.length - 1) {
        const space = document.createElement('span');
        space.textContent = ' ';
        space.style.display = 'inline-block';
        this.element.appendChild(space);
      }
    });
  }

  private splitLines(text: string): void {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    lines.forEach((line, index) => {
      const div = document.createElement('div');
      div.textContent = line.trim();
      div.style.display = 'block';
      div.style.position = this.options.absolute ? 'absolute' : 'relative';
      div.classList.add('split-line');
      div.setAttribute('data-line-index', index.toString());
      
      this.element.appendChild(div);
      this.lines.push(div);
    });
  }

  public revert(): void {
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }

  public getChars(): HTMLElement[] {
    return this.chars;
  }

  public getWords(): HTMLElement[] {
    return this.words;
  }

  public getLines(): HTMLElement[] {
    return this.lines;
  }
}

/**
 * Función helper para crear TextSplitter
 */
export function createTextSplitter(element: HTMLElement, options: TextSplitOptions): TextSplitter {
  return new TextSplitter(element, options);
}

/**
 * Función helper para dividir texto rápidamente
 */
export function splitText(element: HTMLElement, options: TextSplitOptions): SplitTextResult {
  const splitter = new TextSplitter(element, options);
  
  return {
    chars: splitter.getChars(),
    words: splitter.getWords(),
    lines: splitter.getLines(),
    revert: () => splitter.revert()
  };
}
