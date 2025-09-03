/**
 * 🚀 APOLLO NUCLEAR - Motor de API para Belasco de Baquedano
 * Núcleo purificado por Gemini, basado en la obra de PunkClaude & RaulVisionario
 */

// ============================================================================
// TIPOS DE APOLLO - SEGURIDAD DE TIPOS PERFECTA
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message?: string;
    detail?: string;
    code?: string;
  };
  status?: number;
  performance?: {
    responseTime: number;
    endpoint: string;
  };
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  version?: 'v1' | 'v2';
  timeout?: number;
  requiresAuth?: boolean;
}

// ============================================================================
// MOTOR CENTRAL DE APOLLO - POTENCIA PURA
// ============================================================================

export class ApolloEngine {
  // Read base URL from NEXT_PUBLIC_API_BASE_URL (safe runtime check). Fallback to the production host.
  private baseUrl: string = (
    (typeof (globalThis as any)?.NEXT_PUBLIC_API_BASE_URL === 'string' && (globalThis as any).NEXT_PUBLIC_API_BASE_URL) ||
    (typeof (globalThis as any)?.process === 'object' && (globalThis as any).process?.env?.NEXT_PUBLIC_API_BASE_URL) ||
    'https://api.belascodebaquedano.com'
  ); // URL Adaptada
  private defaultTimeout: number = 10000;
  private performanceMetrics: Map<string, number[]> = new Map();
  
  public async request<T = any>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const startTime = performance.now();
    
    const {
      method = 'GET',
      headers = {},
      body,
      version = 'v1',
      timeout = this.defaultTimeout,
      requiresAuth = true
    } = options;

    const fullUrl = `${this.baseUrl}/api/${version}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const requestHeaders: Record<string, string> = {
      'Content-Type': body instanceof FormData ? '' : 'application/json',
      ...headers
    };
    
    if (requiresAuth) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
    
    if (body instanceof FormData) {
      delete requestHeaders['Content-Type'];
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal,
      };

      if (body && method !== 'GET') {
        fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
      }

      const response = await fetch(fullUrl, fetchOptions);
      clearTimeout(timeoutId);

      const executionTime = performance.now() - startTime;
      this.recordPerformance(endpoint, executionTime);

      let data: T | undefined;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else if (method !== 'DELETE') {
        data = await response.text() as any;
      }

      const result: ApiResponse<T> = {
        success: response.ok,
        data,
        error: !response.ok ? { 
          message: `HTTP ${response.status}`,
          detail: response.statusText,
          code: response.status.toString()
        } : undefined,
        status: response.status,
        performance: {
          responseTime: executionTime,
          endpoint
        }
      };

      return result;

    } catch (error) {
      const executionTime = performance.now() - startTime;
      
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error',
          detail: 'Request failed',
          code: 'NETWORK_ERROR'
        },
        performance: {
          responseTime: executionTime,
          endpoint
        }
      };
    }
  }

  public async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public async post<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  public async put<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  public async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  private recordPerformance(endpoint: string, responseTime: number): void {
    if (!this.performanceMetrics.has(endpoint)) {
      this.performanceMetrics.set(endpoint, []);
    }
    const metrics = this.performanceMetrics.get(endpoint)!;
    metrics.push(responseTime);
    if (metrics.length > 10) {
      metrics.shift();
    }
  }

  public getPerformanceStats(endpoint: string): { avg: number; min: number; max: number } | null {
    const metrics = this.performanceMetrics.get(endpoint);
    if (!metrics || metrics.length === 0) return null;
    
    return {
      avg: metrics.reduce((a, b) => a + b, 0) / metrics.length,
      min: Math.min(...metrics),
      max: Math.max(...metrics)
    };
  }
}

// ============================================================================
// EXPORTAR LA INSTANCIA PURIFICADA DEL MOTOR APOLLO
// ============================================================================

const apolloEngine = new ApolloEngine();

export default apolloEngine;
