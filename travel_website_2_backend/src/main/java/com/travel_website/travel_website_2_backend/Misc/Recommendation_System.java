package com.travel_website.travel_website_2_backend.Misc;

import java.io.*;
import java.util.Random;
import java.util.StringTokenizer;

public class Recommendation_System {
    public record Pair<A, B>(A a, B b) {

    }

    public static float[][] CreateMatrix(String inputFile)throws FileNotFoundException, IOException
    {
        float[][] matrix = new float[1000][2069];
        for (int i = 0; i<matrix.length; ++i)
        {
            for (int j = 0; j<matrix[0].length; ++j)
            {
                matrix[i][j] = -1f;
            }
        }

        // Read the input values and form the full matrix
        BufferedReader br = new BufferedReader(new FileReader(inputFile));
        StringTokenizer st = null;
        String row;
        while ((row = br.readLine()) != null)
        {
            st = new StringTokenizer(row, ",");
            while(st.hasMoreTokens())
            {
                int user = Integer.parseInt(st.nextToken());
                int movie = Integer.parseInt(st.nextToken());
                float rating = Integer.parseInt(st.nextToken());
                matrix[user-1][movie-1] = rating;
                st.nextToken();
            }
        }
        return matrix;
    }

    public static Pair<float[][], float[][]> myRecommender(float[][] matrix, int r, float rate, float lambda)
    {
        int maxIter = 1000;
        int n1 = matrix.length;
        int n2 = matrix[0].length;

        float[][] U = new float[n1][r];
        float[][] V = new float[n2][r];

        // Initialize U and V matrix
        Random rand = new Random();
        for (int i = 0; i < U.length; ++i)
        {
            for (int j = 0; j < U[0].length; ++j)
            {
                U[i][j] = rand.nextFloat()/(float)r;
            }
        }

        for (int i = 0; i < V.length; ++i)
        {
            for (int j = 0; j < V[0].length; ++j)
            {
                V[i][j] = rand.nextFloat()/(float)r;
            }
        }


        // Gradient Descent
        for (int iter = 0; iter < maxIter; ++iter)
        {

            float[][] prodMatrix = new float[n1][n2];
            for (int i = 0; i < n1; ++i)
            {
                for (int j = 0; j < n2; ++j)
                {
                    for (int k = 0; k < r; ++k)
                    {
                        prodMatrix[i][j] += U[i][k]*V[j][k];
                    }
                }
            }

            float[][] errorMatrix = new float[n1][n2];
            for (int i = 0; i < n1; ++i)
            {
                for (int j = 0; j < n2; ++j)
                {
                    if (matrix[i][j] == -1f)
                    {
                        errorMatrix[i][j] = 0f;
                    }
                    else
                    {
                        errorMatrix[i][j] = matrix[i][j] - prodMatrix[i][j];
                    }
                }
            }

            float[][] UGrad = new float[n1][r];
            for (int i = 0; i < n1; ++i)
            {
                for (int j = 0; j < r; ++j)
                {
                    for (int k = 0; k < n2; ++k)
                    {
                        UGrad[i][j] += errorMatrix[i][k]*V[k][j];
                    }
                }
            }

            float[][] VGrad = new float[n2][r];
            for (int i = 0; i < n2; ++i)
            {
                for (int j = 0; j < r; ++j)
                {
                    for (int k = 0; k < n1; ++k)
                    {
                        VGrad[i][j] += errorMatrix[k][i]*U[k][j];
                    }
                }
            }

            float[][] Un = new float[n1][r];
            for (int i = 0; i < n1; ++i)
            {
                for (int j = 0; j < r; ++j)
                {
                    Un[i][j] = (1f - rate*lambda)*U[i][j] + rate*UGrad[i][j];
                }
            }

            float[][] Vn = new float[n2][r];
            for (int i = 0; i < n2; ++i)
            {
                for (int j = 0; j < r; ++j)
                {
                    Vn[i][j] = (1f - rate*lambda)*V[i][j] + rate*VGrad[i][j];
                }
            }

            U = Un;
            V = Vn;
        }

        Pair<float[][], float[][]> p = new Pair<float[][], float[][]>(U,V);
        return p;
    }

    public static void PredictRating(float[][] U, float[][] V)throws FileNotFoundException, IOException
    {
        int n1 = U.length;
        int n2 = V.length;
        int r = V[0].length;

        float[][] prodMatrix = new float[n1][n2];
        for (int i = 0; i < n1; ++i)
        {
            for (int j = 0; j < n2; ++j)
            {
                for (int k = 0; k < r; ++k)
                {
                    prodMatrix[i][j] += U[i][k]*V[j][k];
                }
            }
        }
    }
}
