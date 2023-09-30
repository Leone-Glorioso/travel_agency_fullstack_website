package com.travel_website.travel_website_2_backend.Misc;

import java.util.*;


import com.travel_website.travel_website_2_backend.Service.RoomService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import org.apache.commons.math3.linear.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.lang.Math.pow;

//import static org.apache.commons.math3.fitting.leastsquares.GaussNewtonOptimizer.Decomposition.SVD;
@Service
public class Recommender_two {

    public record Pair<A, B>(A a, B b) {

    }

    public static double prediction(double[] userVector, double[] itemVector) {
        double prediction = 0;
        for (int k = 0; k < userVector.length; k++) {
            prediction += userVector[k] * itemVector[k];
        }
        return prediction;
    }

    public double[][] getTranspose(double[][] matrix)
    {
        // find number of rows and columns in matrix M
        int n = matrix.length, m = matrix[0].length;

        // create empty transpose matrix of size m*n
        double M_transpose[][] = new double[m][n];

        // traverse matrix M
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                //assign M_transpose[j][i] as M[i][j]
                M_transpose[j][i] = matrix[i][j];
            }
        }
        return M_transpose;
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

    public Pair<double[][], double[][]> matrix_factorization(double[][] R, double[][] Q, double[][] P, int K, int steps, double rate, double lambda)
    {
        double[][] Qt = getTranspose(Q);

        for(int step = 0; step < steps; step++)
        {
            for(int i = 0; i < R.length; i++)
            {
                for(int j = 0; j < R[i].length; j++)
                {

                    double error = R[i][j] - prediction(P[i], getColumn(Qt, j, K));

                    for(int k = 0; k < K; k++)
                    {
                        P[i][k] = P[i][k] + rate * (2 * error * Qt[k][j] - lambda * P[i][k]);
                        Qt[k][j] = Qt[k][j] + rate * (2 * error * P[i][k] - lambda * Qt[k][j]);
                    }

                }
            }

            double e = 0;

            for(int i = 0; i < R.length; i++)
            {
                for (int j = 0; j < R[i].length; j++)
                {
                    if(R[i][j] > 0)
                    {
                        e = e + pow(R[i][j] - prediction(P[i], getColumn(Qt, j, K)), 2);
                    }

                    for(int k = 0; k < K; k++)
                    {
                        e = e + (lambda/2) * (pow(P[i][k],2) + pow(Qt[k][j],2));
                    }
                }

            }

            if(e < 0.001)
                break;
        }
        return new Pair<>(P, getTranspose(Qt));
    }

    public static double[] getColumn(double[][] array, int index, int rows){
        double[] column = new double[rows];
        for(int i=0; i<rows; i++){
            column[i] = array[i][index];
        }
        return column;
    }

    public static double[][] multiplyMatrices(double[][] firstMatrix, double[][] secondMatrix) {
        int r1 = firstMatrix.length;
        int r2 = secondMatrix.length;
        int c1 = firstMatrix[0].length;
        int c2 = secondMatrix[0].length;

        if(r2 != c1)
            return null;
        double[][] product = new double[r1][c2];
        for(int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                for (int k = 0; k < c1; k++) {
                    product[i][j] += firstMatrix[i][k] * secondMatrix[k][j];
                }
            }
        }

        return product;
    }

    public double[][] getMF(double[][] R)
    {
        int K = 10;
        int steps = 1000;
        double rate = 0.0002;
        double lambda = 0.02;

        double[][] P = initializeMatrix(R.length, K);
        double[][] Q = initializeMatrix(R[0].length, K);

        Pair<double[][], double[][]> pair = matrix_factorization(R, Q, P, K, steps, rate, lambda);

        for(int i = 0; i < pair.a.length; i++) {
            for (int j = 0; j < pair.a[i].length; j++) {
                System.out.print(pair.a[i][j]);
            }
            System.out.println();
        }
        for(int i = 0; i < pair.b.length; i++) {
            for (int j = 0; j < pair.b[i].length; j++) {
                System.out.print(pair.b[i][j]);
            }
            System.out.println();
        }
        return multiplyMatrices(pair.a, getTranspose(pair.b));

    }

    public double[] getUserRankingOfRooms(double[][] R, int user)
    {
        double[][] matrix = getMF(R);
        return R[user];
    }

}
