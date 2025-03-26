import axios from "axios";
import { ImageMetadataProps } from "../contexts/MetadataContext";

// API base URL - update this to match Flask API
const API_BASE_URL = "http://localhost:5001";

/**
 * Sends image data to the Flask API for prediction
 * @param imageFile The image file to be processed
 * @returns Prediction result
 */
export const predictImageWithAPI = async (
  imageFile: File
): Promise<{ class: string; confidence: string }> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(`${API_BASE_URL}/predict_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data) {
      return {
        class: response.data.class || "unknown",
        confidence: (response.data.confidence || "95").toString(),
      };
    }

    throw new Error('Invalid response from API');
  } catch (error) {
    console.error('Error predicting with API:', error);
    throw error;
  }
};

/**
 * Verifies a prediction against the actual diagnosis
 * @param imageFile The image file to be processed
 * @param actualDiagnosis The known actual diagnosis
 * @returns Verification result
 */
export const verifyPredictionWithAPI = async (
  imageFile: File,
  actualDiagnosis: string
): Promise<{
  class: string;
  confidence: string;
  actual_diagnosis: string;
  is_correct: boolean;
}> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('actual_diagnosis', actualDiagnosis);

    const response = await axios.post(`${API_BASE_URL}/predict_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      class: response.data.class,
      confidence: response.data.confidence.toString(),
      actual_diagnosis: response.data.actual_diagnosis,
      is_correct: response.data.is_correct
    };
  } catch (error) {
    console.error('Error verifying prediction with API:', error);
    throw error;
  }
};

/**
 * Sends metadata to the Flask API for prediction
 * @param metadata Patient metadata for prediction
 * @returns Prediction result
 */
export const predictMetadataWithAPI = async (
  metadata: ImageMetadataProps
): Promise<{ prediction: number; class: string }> => {
  try {
    // Transform the metadata to match the API's expected format
    const features = {
      age: metadata.age,
      sex: metadata.gender?.toLowerCase() === 'male' ? 'male' : 'female',
      localization: metadata.lesionLocation?.toLowerCase() || 'unknown'
    };

    const response = await axios.post(`${API_BASE_URL}/predict_metadata`, {
      features: features
    });

    if (response.data && response.data.prediction !== undefined) {
      return {
        prediction: response.data.prediction,
        class: response.data.class
      };
    }

    throw new Error('Invalid response from API');
  } catch (error) {
    console.error('Error predicting with metadata API:', error);
    throw error;
  }
};

/**
 * Gets metadata model information from the API
 * @returns Model information including expected features and class labels
 */
export const getMetadataModelInfo = async (): Promise<{
  expected_features: number;
  model_type: string;
  class_labels: string[];
  feature_columns: string[];
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metadata_model_info`);
    return response.data;
  } catch (error) {
    console.error('Error getting metadata model info:', error);
    throw error;
  }
};

/**
 * Checks if the API server is healthy
 * @returns Health status
 */
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

/**
 * Sends both image and metadata to the Flask API for fusion prediction
 * @param imageFile The image file to be processed
 * @param metadata Patient metadata for prediction
 * @returns Fusion prediction result
 */
export const predictWithFusionAPI = async (
  imageFile: File,
  metadata: ImageMetadataProps,
  actualDiagnosis?: string  // Add optional parameter for actual diagnosis
): Promise<{
  class: string;
  fusion_prediction: number;
  image_probs: number[][];
  metadata_probs: number[][];
  final_probs: number[][];
  actual_diagnosis?: string;  // Add to return type
  is_correct?: boolean;       // Add to return type
}> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Transform the metadata to match the API's expected format
    const metadataForAPI = {
      age: metadata.age,
      sex: metadata.gender?.toLowerCase() === 'male' ? 'male' : 'female',
      localization: metadata.lesionLocation?.toLowerCase() || 'unknown'
    };
    
    // Add metadata as JSON string
    formData.append('metadata', JSON.stringify(metadataForAPI));
    
    // Add actual diagnosis if provided
    if (actualDiagnosis) {
      formData.append('actual_diagnosis', actualDiagnosis);
    }

    const response = await axios.post(`${API_BASE_URL}/predict_fusion`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data) {
      return {
        class: response.data.class || "unknown",
        fusion_prediction: response.data.fusion_prediction,
        image_probs: response.data.image_probs || [],
        metadata_probs: response.data.metadata_probs || [],
        final_probs: response.data.final_probs || [],
        actual_diagnosis: actualDiagnosis,
        is_correct: actualDiagnosis ? 
          response.data.class.toLowerCase() === actualDiagnosis.toLowerCase() : 
          undefined
      };
    }
    
    throw new Error('Invalid response from API');
  } catch (error) {
    console.error('Error predicting with fusion API:', error);
    throw error;
  }
};