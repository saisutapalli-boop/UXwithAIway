import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private readonly http = inject(HttpClient);
  private readonly apiEndpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  generateInsights(prompt: string): Observable<string> {
    const url = `${this.apiEndpoint}?key=${environment.geminiApiKey}`;
    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    return this.http.post<GeminiResponse>(url, body).pipe(
      map((response) => response.candidates[0].content.parts[0].text),
      catchError(() => of('Unable to generate insights at this time.'))
    );
  }
}
