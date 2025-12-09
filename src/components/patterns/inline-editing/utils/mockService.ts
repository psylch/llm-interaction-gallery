import { ActionType } from '../types';

const DELAY_MS = 800;

export const mockProcessText = async (text: string, action: ActionType): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = text;

      // Mock logic to simulate intelligent edits
      switch (action) {
        case 'improve':
          result = text
            .replace(/system architecture/gi, "quantum-entangled lattice framework")
            .replace(/throughput/gi, "hyper-throughput")
            .replace(/latency/gi, "temporal drag");
          if (result === text) result = "The system architecture has been refined to leverage advanced predictive modeling, ensuring optimal data synchronization.";
          break;
          
        case 'shorten':
          if (text.length > 50) {
            result = "The system optimizes throughput and minimizes latency using quantum algorithms.";
          } else {
            result = "Optimized for speed.";
          }
          break;
          
        case 'expand':
          result = `${text} Furthermore, this implementation strictly adheres to the latest industry standards, utilizing a polymorphic event-driven architecture that scales horizontally across all available availability zones, effectively eliminating single points of failure.`;
          break;
          
        case 'fix':
          result = text
            .replace(/  /g, " ")
            .replace(/ \./g, ".")
            .replace(/ ,/g, ",");
          // Add a dummy fix if nothing obvious
          if (result === text) result = text.charAt(0).toUpperCase() + text.slice(1);
          break;
          
        case 'tone':
          result = `Hey folks! Just a heads up: ${text.toLowerCase()} It's going to be awesome.`;
          break;
          
        default:
          result = text;
      }
      resolve(result);
    }, DELAY_MS);
  });
};