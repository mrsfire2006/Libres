using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Books.Domain
{
    public class Book : AggregateRoot
    {
        public string Title { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public DateTime CreatedAt { get; private set; }
        // public User? Author { get; set; }
        public Guid UserId { get; set; }
        public decimal Price { get; set; } = 0;

        public int Order { get; private set; } = 0;
        public string? CoverImagePath { get; private set; }
        public string? FilePath { get; private set; }


        public Guid? CategoryId { get; private set; }

        public BookStatus BookStatus { get; private set; } = BookStatus.Pending;

        public double AverageRating { get; private set; } = 0.0;
        public int ReviewsCount { get; private set; } = 0;





        public Book() : base(Guid.Empty)
        {
        }

        public Book(Guid id, string title, Guid userId, Guid? categoryId,
                    decimal price,
                    string? description, string? coverImagePath, string? filePath) : base(id)
        {
            Title = title;
            Description = description;
            UserId = userId;
            CategoryId = categoryId;
            CreatedAt = DateTime.UtcNow;
            CoverImagePath = coverImagePath;
            Price = price;
            FilePath = filePath;
        }

        public static Result<Book> Create(string title, Guid userId, Guid? categoryId,
                                        decimal price,
                                          string? description, string? coverImagePath, string? filePath)
        {
            var book = new Book(Guid.NewGuid(), title, userId, categoryId, price, description, coverImagePath, filePath);
            return Result<Book>.Success(book);
        }


        public void UpdateStatus(BookStatus status)
        {
            this.BookStatus = status;
        }

        public Result ChangeName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
            {
                return Result.Failure("New Name Cannot be empty");
            }
            this.Title = newName;
            return Result.Success();
        }
        public Result ChangeDescription(string? newDescription)
        {
            this.Description = newDescription;

            return Result.Success();
        }
        public Result UpdatePrice(decimal newPrice)
        {
            if (newPrice < 0)
            {
                return Result.Failure($"{newPrice} < 0");
            }
            Price = newPrice;
            return Result.Success();
        }
        public Result ChangeCategory(Guid? newCategoryId)
        {
            CategoryId = newCategoryId;
            return Result.Success();
        }


        public Result<bool> UpdateAverageRate(double newAverageRating, int newReviewsCount)
        {
            if (newAverageRating < 0 || newAverageRating > 5)
            {
                return Result<bool>.Failure("Rating must be between 0 and 5.");
            }

            if (newReviewsCount < 0)
            {
                return Result<bool>.Failure("Reviews count cannot be negative.");
            }

            this.AverageRating = Math.Round(newAverageRating, 2);

            this.ReviewsCount = newReviewsCount;

            return Result<bool>.Success(true);
        }


    }
}