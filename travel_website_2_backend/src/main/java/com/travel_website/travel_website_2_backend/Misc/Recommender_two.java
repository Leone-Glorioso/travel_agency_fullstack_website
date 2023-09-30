//package com.travel_website.travel_website_2_backend.Misc;
//
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//import java.util.Random;
//import org.apache.commons.math3.linear.*;
//
////import static org.apache.commons.math3.fitting.leastsquares.GaussNewtonOptimizer.Decomposition.SVD;
//
//public class Recommender_two {
//    public static void main(String[] args) {
//        // Define the dimensions of the user-item interaction matrix
//        int numUsers = 5;
//        int numItems = 4;
//
//        // Define hyperparameters
//        int latentFactors = 2; // Number of latent factors
//        int numIterations = 100;
//
//        // Generate synthetic user-item interaction data (replace with your dataset)
//        RealMatrix userItemMatrix = generateSyntheticData(numUsers, numItems);
//
//        // Perform matrix factorization using Singular Value Decomposition (SVD)
//        RealMatrix userMatrix;
//        RealMatrix itemMatrix;
//        SVD svd = new SVD(userItemMatrix, latentFactors, numIterations);
//        svd.factorize();
//
//        userMatrix = svd.getUserMatrix();
//        itemMatrix = svd.getItemMatrix();
//
//        // Make recommendations for a user (replace with actual user ID)
//        int userIdToRecommendFor = 0;
//        int numRecommendations = 3;
//        recommendItemsForUser(userIdToRecommendFor, userMatrix, itemMatrix, numRecommendations);
//    }
//
//    // Generate synthetic user-item interaction data (for demonstration purposes)
//    static RealMatrix generateSyntheticData(int numUsers, int numItems) {
//        RealMatrix data = MatrixUtils.createRealMatrix(numUsers, numItems);
//        Random rand = new Random();
//        for (int u = 0; u < numUsers; u++) {
//            for (int i = 0; i < numItems; i++) {
//                data.setEntry(u, i, rand.nextDouble() * 5); // Random ratings between 0 and 5
//            }
//        }
//        return data;
//    }
//
//    // Recommend top N items for a user
//    static void recommendItemsForUser(int userId, RealMatrix userMatrix, RealMatrix itemMatrix, int numRecommendations) {
//        RealMatrix userVector = userMatrix.getRowMatrix(userId);
//        RealMatrix itemScores = userVector.multiply(itemMatrix.transpose());
//
//        // Sort items by score in descending order
//        List<ItemScore> sortedItems = new ArrayList<>();
//        for (int itemId = 0; itemId < itemScores.getColumnDimension(); itemId++) {
//            sortedItems.add(new ItemScore(itemId, itemScores.getEntry(0, itemId)));
//        }
//        sortedItems.sort(Comparator.comparingDouble(ItemScore::getScore).reversed());
//
//        // Get the top N recommended item IDs
//        List<Integer> recommendedItems = new ArrayList<>();
//        for (int i = 0; i < numRecommendations && i < sortedItems.size(); i++) {
//            recommendedItems.add(sortedItems.get(i).getItemId());
//        }
//
//        System.out.println("Recommendations for User " + userId + ":");
//        for (int itemId : recommendedItems) {
//            System.out.println("Item " + itemId + " (Score: " + itemScores.getEntry(0, itemId) + ")");
//        }
//    }
//
//    // Helper class to store item ID and score
//    static class ItemScore {
//        private int itemId;
//        private double score;
//
//        public ItemScore(int itemId, double score) {
//            this.itemId = itemId;
//            this.score = score;
//        }
//
//        public int getItemId() {
//            return itemId;
//        }
//
//        public double getScore() {
//            return score;
//        }
//    }
//}
