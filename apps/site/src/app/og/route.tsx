import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Downshift';
  const description =
    searchParams.get('description') ??
    'Right model per subagent. Shorter clean output. Less to read.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '60px 72px',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,197,94,0.15), transparent)',
          fontFamily: 'system-ui, sans-serif',
          gap: 0,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderBottom: '3px solid #000',
                borderLeft: '3px solid #000',
                transform: 'rotate(-45deg) translateY(-2px)',
              }}
            />
          </div>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: 600 }}>
            Downshift
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '48px' : '56px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '24px',
            color: '#868a90',
            lineHeight: 1.4,
            maxWidth: '800px',
          }}
        >
          {description}
        </div>

        {/* Bottom badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '48px',
            padding: '8px 16px',
            border: '1px solid #1f2329',
            borderRadius: '999px',
            backgroundColor: '#1a1a1a',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          <span style={{ color: '#868a90', fontSize: '16px' }}>
            Free · Apache-2.0 · Go binary
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
