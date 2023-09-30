package com.travel_website.travel_website_2_backend.Misc;

import com.travel_website.travel_website_2_backend.Models.Room;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class Recommender {
    public List<Integer> start_system(int numUsers, int numItems, int userIdToRecommendFor, int numRecommendations) {
        // Define the dimensions of the user-item interaction matrix
//        int numUsers = 5;
//        int numItems = 4;

        // Define hyperparameters
        int latentFactors = 10; // Number of latent factors
        double learningRate = 0.01;
        double regularization = 0.1;
        int numIterations = 1000;

        // Generate synthetic user-item interaction data (replace with your dataset)
        double[][] userItemMatrix = generateSyntheticData(numUsers, numItems);

        // Initialize user and item matrices with random values
        double[][] userMatrix = initializeMatrix(numUsers, latentFactors);
        double[][] itemMatrix = initializeMatrix(numItems, latentFactors);

        // Train the recommendation system using stochastic gradient descent
        for (int iteration = 0; iteration < numIterations; iteration++) {
            for (int u = 0; u < numUsers; u++) {
                for (int i = 0; i < numItems; i++) {
                    if (userItemMatrix[u][i] != 0) { // Skip empty entries
                        double prediction = predict(userMatrix[u], itemMatrix[i]);
                        double error = userItemMatrix[u][i] - prediction;
                        for (int k = 0; k < latentFactors; k++) {
                            userMatrix[u][k] += learningRate * (2 * error * itemMatrix[i][k] - regularization * userMatrix[u][k]);
                            itemMatrix[i][k] += learningRate * (2 * error * userMatrix[u][k] - regularization * itemMatrix[i][k]);
                        }
                    }
                }
            }
        }

        // Make recommendations for a user (replace with actual user ID)
//        int userIdToRecommendFor = 0;
//        int numRecommendations = 3;
        return recommendItemsForUser(userIdToRecommendFor, userMatrix, itemMatrix, numRecommendations);
    }

    // Generate synthetic user-item interaction data (for demonstration purposes)
    public static double[][] generateSyntheticData(int numUsers, int numItems) {
        Random rand = new Random();
        double[][] data = new double[numUsers][numItems];
        for (int u = 0; u < numUsers; u++) {
            for (int i = 0; i < numItems; i++) {
                data[u][i] = rand.nextDouble() * 5; // Random ratings between 0 and 5
            }
        }
        return data;
    }

    // Initialize a matrix with random values between 0 and 1
    public static double[][] initializeMatrix(int numRows, int numCols) {
        Random rand = new Random();
        double[][] matrix = new double[numRows][numCols];
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                matrix[i][j] = rand.nextDouble();
            }
        }
        return matrix;
    }

    // Predict the user-item interaction score
    public static double predict(double[] userVector, double[] itemVector) {
        double prediction = 0;
        for (int k = 0; k < userVector.length; k++) {
            prediction += userVector[k] * itemVector[k];
        }
        return prediction;
    }

    // Recommend top N items for a user
    public static List<Integer> recommendItemsForUser(int userId, double[][] userMatrix, double[][] itemMatrix, int numRecommendations) {
        int numItems = itemMatrix.length;
        Map<Integer, Double> itemScores = new HashMap<>();

        // Calculate predicted scores for all items for the given user
        double[] userVector = userMatrix[userId];
        for (int itemId = 0; itemId < numItems; itemId++) {
            double[] itemVector = itemMatrix[itemId];
            double score = predict(userVector, itemVector);
            itemScores.put(itemId, score);
        }

        // Sort items by score in descending order
        List<Map.Entry<Integer, Double>> sortedItems = new ArrayList<>(itemScores.entrySet());
        sortedItems.sort((entry1, entry2) -> Double.compare(entry2.getValue(), entry1.getValue()));

        // Get the top N recommended item IDs
        List<Integer> recommendedItems = new ArrayList<>();
        for (int i = 0; i < numRecommendations && i < sortedItems.size(); i++) {
            recommendedItems.add(sortedItems.get(i).getKey());
        }

        System.out.println("Recommendations for User " + userId + ":");
        for (int itemId : recommendedItems) {
            System.out.println("Item " + itemId + " (Score: " + itemScores.get(itemId) + ")");
        }
        return recommendedItems;
    }
}
