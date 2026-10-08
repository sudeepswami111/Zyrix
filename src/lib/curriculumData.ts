export type TeachingFormat =
  | "3D Visualization"
  | "Process Animation"
  | "Debug Challenge"
  | "Worked-Example Story"
  | "Quiz & Sandbox"
  | "AI Tutor Chat"
  | "Narrated Video";

export interface TopicGroup {
  groupName: string;
  topics: string[];
  taughtWith: TeachingFormat;
}

export interface ModuleData {
  number: string;
  title: string;
  description: string;
  topicGroups: TopicGroup[];
}

export const curriculumModules: ModuleData[] = [
  {
    number: "01",
    title: "Basic Python Programming",
    description:
      "Core programming foundations, memory models, object design, and defensive coding.",
    topicGroups: [
      {
        groupName: "Basics",
        topics: ["Variables", "Type inference", "Conditional branching", "Loops & comprehensions"],
        taughtWith: "Quiz & Sandbox",
      },
      {
        groupName: "Data Structures",
        topics: ["Lists", "Dictionaries", "Sets", "Tuples", "Memory references & mutability"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Functions",
        topics: ["Built-in functions", "Recursion", "Lambda expressions", "Scope & closures"],
        taughtWith: "Debug Challenge",
      },
      {
        groupName: "Exception Handling & Debugging",
        topics: ["Try-except-finally blocks", "Custom exceptions", "PDB tracing", "Stack analysis"],
        taughtWith: "Debug Challenge",
      },
      {
        groupName: "OOP",
        topics: ["Classes & instances", "Inheritance", "Polymorphism", "Dunder methods", "Encapsulation"],
        taughtWith: "Worked-Example Story",
      },
      {
        groupName: "File Handling",
        topics: ["Context managers", "CSV & JSON streaming", "Binary I/O", "Pathlib operations"],
        taughtWith: "Quiz & Sandbox",
      },
    ],
  },
  {
    number: "02",
    title: "Advanced Python for Data",
    description:
      "Vectorized numeric computation, tabular manipulation, data cleansing, and EDA workflows.",
    topicGroups: [
      {
        groupName: "NumPy Arrays",
        topics: ["N-dimensional arrays", "Broadcasting rules", "Vectorization", "Fancy indexing", "Memory layouts"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Pandas Series & DataFrames",
        topics: ["Index alignment", "Filtering & loc/iloc", "GroupBy split-apply-combine", "Merge & joins"],
        taughtWith: "Worked-Example Story",
      },
      {
        groupName: "Data Cleaning",
        topics: ["Imputation strategies", "Outlier detection", "Type coercion", "Regex extraction", "De-duplication"],
        taughtWith: "Debug Challenge",
      },
      {
        groupName: "Visualization",
        topics: ["Matplotlib anatomy", "Seaborn statistical plots", "Interactive Plotly", "Color & hierarchy"],
        taughtWith: "Worked-Example Story",
      },
      {
        groupName: "EDA & Feature Engineering",
        topics: ["Target encoding", "Log transforms", "Interaction terms", "Correlation matrices", "Feature scaling"],
        taughtWith: "Worked-Example Story",
      },
    ],
  },
  {
    number: "03",
    title: "Relational Databases (SQL)",
    description:
      "Query design, relational algebra, multi-table joins, analytic window functions, and indexing.",
    topicGroups: [
      {
        groupName: "Basic Queries",
        topics: ["SELECT & WHERE", "Logical operators", "ORDER BY & LIMIT", "DISTINCT & NULL handling"],
        taughtWith: "Quiz & Sandbox",
      },
      {
        groupName: "Table Modification",
        topics: ["CREATE & ALTER", "INSERT, UPDATE, DELETE", "Primary & Foreign keys", "Transactions & ACID"],
        taughtWith: "Quiz & Sandbox",
      },
      {
        groupName: "Joins",
        topics: ["INNER JOIN", "LEFT & RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN", "Self joins & cardinality"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Aggregates & Grouping",
        topics: ["GROUP BY", "HAVING clauses", "COUNT, SUM, AVG", "Min-max aggregations", "Grouping sets"],
        taughtWith: "Quiz & Sandbox",
      },
      {
        groupName: "Advanced SQL",
        topics: ["Correlated subqueries", "Window functions (ROW_NUMBER, RANK, DENSE_RANK)", "CTEs & Recursive queries", "Indexes & EXPLAIN plans"],
        taughtWith: "Debug Challenge",
      },
    ],
  },
  {
    number: "04",
    title: "Mathematics for Data Science",
    description:
      "Geometry of vector spaces, matrix transformations, calculus derivatives, and gradient fields.",
    topicGroups: [
      {
        groupName: "Basic Math & Coordinate Geometry",
        topics: ["Cartesian coordinate systems", "Euclidean distance", "Lines & hyperplanes", "Vector projection"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Linear Algebra",
        topics: ["Vector spaces", "Matrix multiplication", "Eigenvalues & eigenvectors", "Determinants", "Orthogonal matrices"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Calculus",
        topics: ["Limits & continuity", "Derivatives & chain rule", "Partial derivatives", "Jacobian & Hessian matrices"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Probability",
        topics: ["Sample spaces", "Conditional probability", "Bayes theorem", "Random variables", "Expectation & variance"],
        taughtWith: "AI Tutor Chat",
      },
    ],
  },
  {
    number: "05",
    title: "Statistics for Data Science",
    description:
      "Statistical inference, continuous & discrete distributions, confidence bounds, and rigorous testing.",
    topicGroups: [
      {
        groupName: "Descriptive Statistics",
        topics: ["Central tendency (mean, median, mode)", "Spread & dispersion", "IQR & Box plots", "Skewness & kurtosis"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Probability Distributions",
        topics: ["Gaussian / Normal", "Binomial & Bernoulli", "Poisson distribution", "Uniform & Exponential", "CDF & PDF curves"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Sampling & CLT",
        topics: ["Central Limit Theorem", "Sampling bias", "Standard error", "Bootstrap resamples", "Law of Large Numbers"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Inferential Statistics",
        topics: ["Confidence intervals", "Point estimation", "Degrees of freedom", "Margin of error", "Likelihood estimation"],
        taughtWith: "AI Tutor Chat",
      },
      {
        groupName: "Hypothesis Testing",
        topics: ["Null & Alternative hypotheses", "p-values", "t-tests (1-sample, 2-sample)", "Z-tests", "ANOVA & Chi-Square", "Type I & II errors"],
        taughtWith: "Debug Challenge",
      },
    ],
  },
  {
    number: "06",
    title: "Machine Learning",
    description:
      "Supervised regression & classification, tree ensembles, unsupervised clustering, and dimensionality reduction.",
    topicGroups: [
      {
        groupName: "ML Fundamentals",
        topics: ["Train/test splits", "Cross-validation", "Bias-variance tradeoff", "Overfitting vs underfitting", "Confusion matrix & F1"],
        taughtWith: "Narrated Video",
      },
      {
        groupName: "Linear Regression & Gradient Descent",
        topics: ["Ordinary Least Squares (OLS)", "Cost surfaces", "Batch & SGD", "Learning rate scheduling", "Ridge & Lasso (L1/L2)"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Logistic Regression",
        topics: ["Sigmoid activation", "Log-loss / Cross-entropy", "Decision boundary", "ROC & AUC evaluation"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "KNN & SVM",
        topics: ["Distance metrics", "Voronoi partitioning", "Support vectors", "Margin maximization", "Kernel trick (RBF)"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Decision Trees & Ensemble Methods",
        topics: ["Gini impurity & Entropy", "Random Forests", "Bagging vs Boosting", "Gradient Boosted Trees (XGBoost/LightGBM)"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Naive Bayes",
        topics: ["Prior, posterior, likelihood", "Laplace smoothing", "Gaussian NB", "Multinomial text classification"],
        taughtWith: "Quiz & Sandbox",
      },
      {
        groupName: "Clustering",
        topics: ["K-Means centroid convergence", "Elbow method & Silhouette score", "Hierarchical dendrograms", "DBSCAN density reachability"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Dimensionality Reduction (PCA)",
        topics: ["Variance retention", "Covariance decomposition", "Principal components", "Scree plots", "2D/3D manifold projections"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Time Series",
        topics: ["Trend & Seasonality", "Stationarity & ADF test", "Autocorrelation (ACF/PACF)", "ARIMA models"],
        taughtWith: "Worked-Example Story",
      },
    ],
  },
  {
    number: "07",
    title: "Deep Learning",
    description:
      "Perceptrons, computation graphs, auto-differentiation, convolutional kernels, and sequence models.",
    topicGroups: [
      {
        groupName: "ANN Fundamentals",
        topics: ["Artificial neurons", "Activation functions (ReLU, GELU, Softmax)", "Forward pass", "Loss functions"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Backpropagation & Optimizers",
        topics: ["Computational graph derivatives", "Gradient descent variants", "Momentum, RMSprop, Adam", "Vanishing & exploding gradients"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Convolutional Neural Networks (CNN)",
        topics: ["Kernel filters & feature maps", "Stride & padding", "Max pooling", "Receptive field", "ResNet skip connections"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Recurrent Neural Networks (RNN)",
        topics: ["Recurrent hidden state", "BPTT (Backprop through time)", "LSTM gates (forget, input, output)", "GRU units"],
        taughtWith: "Process Animation",
      },
    ],
  },
  {
    number: "08",
    title: "NLP & Computer Vision",
    description:
      "Text processing pipelines, token embeddings, image convolutions, spatial features, and bounding box detectors.",
    topicGroups: [
      {
        groupName: "NLP Basics",
        topics: ["Tokenization & Lemmatization", "Stop words removal", "N-grams", "TF-IDF matrix"],
        taughtWith: "Narrated Video",
      },
      {
        groupName: "Text Vectorization",
        topics: ["Word2Vec skip-gram & CBOW", "Cosine similarity in embedding space", "GloVe representations", "Contextual embeddings"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Image Basics",
        topics: ["Color channels (RGB/Grayscale)", "Pixel matrices", "Image normalization", "Affine augmentations"],
        taughtWith: "Process Animation",
      },
      {
        groupName: "Filtering & Convolution",
        topics: ["Sobel edge detection", "Gaussian blur", "Spatial convolution kernels", "Frequency domain filtering"],
        taughtWith: "3D Visualization",
      },
      {
        groupName: "Feature Detection",
        topics: ["Corner detection (Harris)", "SIFT keypoints", "Descriptor matching", "Homography estimation"],
        taughtWith: "Worked-Example Story",
      },
      {
        groupName: "Object Detection",
        topics: ["Bounding box coordinates", "Intersection over Union (IoU)", "Non-Max Suppression (NMS)", "Anchor boxes & YOLO intuition"],
        taughtWith: "3D Visualization",
      },
    ],
  },
];

