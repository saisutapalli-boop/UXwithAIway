import { Component, ChangeDetectionStrategy, Input, signal, computed } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-youtube-embed',
  standalone: true,
  imports: [SafePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="video-container">
      @if (!isLoaded()) {
        <button 
          type="button" 
          class="video-preview-btn" 
          (click)="loadVideo()" 
          [attr.aria-label]="'Play video: ' + title">
          <div class="thumbnail-wrap">
            <img [src]="thumbnailUrl()" [alt]="title" class="video-thumbnail" loading="lazy">
            <div class="play-overlay" aria-hidden="true">
              <svg viewBox="0 0 68 48" class="play-icon">
                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 c-2.93,.78-4.63,3.26-5.42,6.19C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </div>
          </div>
          <div class="video-info">
            <span class="video-title">{{ title }}</span>
            <span class="video-action">Click to load video</span>
          </div>
        </button>
      } @else {
        <div class="iframe-wrap">
          <iframe
            [src]="embedUrl() | safe:'resourceUrl'"
            [title]="title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        </div>
      }
    </div>
  `,
  styles: [`
    .video-container {
      position: relative;
      width: 100%;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #000;
      aspect-ratio: 16 / 9;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }

    .video-preview-btn {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      background: transparent;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      text-align: left;
    }

    .thumbnail-wrap {
      position: relative;
      width: 100%;
      flex: 1;
      overflow: hidden;
    }

    .video-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .video-preview-btn:hover .video-thumbnail {
      transform: scale(1.05);
    }

    .play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.1);
      transition: background 0.3s ease;
    }

    .video-preview-btn:hover .play-overlay {
      background: rgba(0,0,0,0);
    }

    .play-icon {
      width: 68px;
      height: 48px;
      opacity: 0.9;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .video-preview-btn:hover .play-icon {
      transform: scale(1.15);
      opacity: 1;
    }

    .video-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 16px;
      background: linear-gradient(transparent, rgba(0,0,0,0.85));
      color: #fff;
    }

    .video-title {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .video-action {
      font-size: 0.75rem;
      opacity: 0.8;
      font-weight: 500;
    }

    .iframe-wrap {
      width: 100%;
      height: 100%;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  `],
})
export class YoutubeEmbedComponent {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) title!: string;

  readonly isLoaded = signal(false);

  readonly videoId = computed(() => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = this.url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  });

  readonly thumbnailUrl = computed(() => {
    const id = this.videoId();
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
  });

  readonly embedUrl = computed(() => {
    const id = this.videoId();
    // rel=0: related videos from the same channel
    // modestbranding=1: hide YouTube logo
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : '';
  });

  loadVideo() {
    this.isLoaded.set(true);
  }
}
