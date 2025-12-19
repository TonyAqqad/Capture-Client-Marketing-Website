// LeadConnector/HighLevel Chat Widget API Types
// https://help.gohighlevel.com/support/solutions/articles/48001191051

interface LeadConnectorChatWidget {
  openWidget: () => void;
  closeWidget: () => void;
  localizeWidget: (labels: Record<string, string>) => void;
}

interface LeadConnector {
  chatWidget: LeadConnectorChatWidget;
}

declare global {
  interface Window {
    leadConnector?: LeadConnector;
  }
}

export {};
