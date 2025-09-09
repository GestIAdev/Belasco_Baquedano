import { NextResponse, NextRequest } from 'next/server';
import { NewsArticle } from '@/app/types';
import { fallbackNewsData } from '@/app/data/fallbackNewsData';

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallbackNewsData);
  }

  // --- OPERACIÓN RED GLOBAL ---
  // La red de espías ahora cubre los dos hemisferios.
  const defaultQuery = '(vino OR bodega OR enologia) AND (argentina OR españa OR francia OR italia)';
  const searchQuery = request.nextUrl.searchParams.get('q') || defaultQuery;

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&searchIn=title&language=es&sortBy=relevancy&pageSize=20&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok' || data.articles.length === 0) {
      // Si ni siquiera la red global encuentra nada, nuestra bóveda nos salva.
      return NextResponse.json(fallbackNewsData);
    }

    type RawArticle = {
      title?: string;
      description?: string | null;
      publishedAt?: string;
      source?: { name?: string } | null;
      url?: string;
    };

    const articles: NewsArticle[] = (data.articles as RawArticle[]).map((article, index) => ({
      id: index,
      title: article.title ?? 'Sin título',
      summary: article.description ?? 'Sin resumen disponible.',
      date: article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Fecha desconocida',
      source: article.source?.name ?? 'Desconocido',
      url: article.url ?? '#',
    }));

    return NextResponse.json(articles);
  } catch {
    // Nuestra bóveda es la última línea de defensa.
    return NextResponse.json(fallbackNewsData);
  }
}