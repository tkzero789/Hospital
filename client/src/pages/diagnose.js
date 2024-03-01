// function findSuitableArticles(articles, symptoms, symptomDescriptions) {
//     const articleScores = new Map(); // Use a Map for efficient key-value storage

//     for (const article of articles) {
//       let articleScore = 0;
//       for (const symptom of article.symptoms) {
//         for (const category of symptom.categories) {
//           for (const description of category.descriptions) {
//             if (symptomDescriptions.includes(description.descriptionDetail)) {
//               articleScore += 1;
//             }
//           }
//         }
//       }
//       articleScores.set(article._id, articleScore); // Store the article score
//     }

//     // Sort articles based on scores (highest to lowest)
//     const sortedArticles = [...articleScores.entries()].sort((a, b) => b[1] - a[1]);

//     // Retrieve the sorted article IDs
//     const sortedArticleIds = sortedArticles.map(([articleId]) => articleId);

//     // Retrieve the full article details based on sorted IDs
//     const sortedArticlesDetails = sortedArticleIds.map((articleId) =>
//       articles.find((article) => article._id === articleId)
//     );

//     return sortedArticlesDetails;
//   }

//   // Example usage:
//   const suitableArticles = findSuitableArticles(articles, symptoms, symptomDescriptions);
//   suitableArticles;
