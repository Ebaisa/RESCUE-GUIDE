class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.onMessageCallback = null;
    this.onStatusChangeCallback = null;
  }

  connect(hospitalId) {
    if (this.ws) {
      this.disconnect();
    }

    try {
      this.ws = new WebSocket(`wss://eba.onrender.com/ws/hospital/${hospitalId}`);

      this.ws.onopen = () => {
        console.log('WebSocket Connected');
        this.isConnected = true;
        if (this.onStatusChangeCallback) {
          this.onStatusChangeCallback(true);
        }
      };

      this.ws.onmessage = (event) => {
        console.log('WebSocket Message Received:', event.data);
        if (this.onMessageCallback) {
          this.onMessageCallback(JSON.parse(event.data));
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket Disconnected');
        this.isConnected = false;
        if (this.onStatusChangeCallback) {
          this.onStatusChangeCallback(false);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        this.isConnected = false;
        if (this.onStatusChangeCallback) {
          this.onStatusChangeCallback(false);
        }
      };
    } catch (error) {
      console.error('WebSocket Connection Error:', error);
      this.isConnected = false;
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback(false);
      }
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback(false);
      }
    }
  }

  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }

  setOnStatusChangeCallback(callback) {
    this.onStatusChangeCallback = callback;
  }

  sendMessage(recipientId, content) {
    if (this.ws && this.isConnected) {
      const message = {
        sender_type: 'hospital',
        sender_id: JSON.parse(localStorage.getItem('hospitalUser')).userId,
        recipient_type: 'user',
        recipient_id: recipientId,
        content: content
      };
      this.ws.send(JSON.stringify(message));
    }
  }
}

export default new WebSocketService(); 