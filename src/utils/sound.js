// Sound utility for keyboard switch sounds
class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.volume = 0.3
    this.audio = null
    this.loadSound()
  }

  // Load the MP3 sound file
  loadSound() {
    try {
      this.audio = new Audio('/data/16fe8ac99665d1c.mp3')
      this.audio.volume = this.volume
    } catch (error) {
      console.warn('Failed to load sound:', error)
    }
  }

  playSwitch(type = 'red') {
    if (!this.enabled || !this.audio) return
    
    try {
      // Clone the audio to allow multiple simultaneous plays
      const sound = this.audio.cloneNode()
      sound.volume = this.volume
      sound.play().catch(error => {
        console.warn('Audio playback failed:', error)
      })
    } catch (error) {
      console.warn('Audio playback failed:', error)
    }
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol))
    if (this.audio) {
      this.audio.volume = this.volume
    }
  }
}

export const soundManager = new SoundManager()
