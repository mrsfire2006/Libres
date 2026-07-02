using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Wallet.Domain
{
    public class Wallet : AggregateRoot
    {
        public Guid UserId { get; private set; }
        public WalletStatus Status { get; private set; } = WalletStatus.Active;

        public decimal Balance { get; private set; } = 500;

        public string Currency { get; private set; } = "$";

        // private List<WalletTransaction> _walletTransactions = new List<WalletTransaction>();
        // public IReadOnlyCollection<WalletTransaction> WalletTransactions => _walletTransactions.AsReadOnly();

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime? LastUpdate { get; private set; }



        protected Wallet() : base(Guid.Empty)
        {
        }
        private Wallet(Guid id, Guid userId) : base(id)
        {
            UserId = userId;

        }

        public static Result<Wallet> Create(Guid userId)
        {

            if (userId == Guid.Empty)
            {
                return Result<Wallet>.Failure(Error.Validation("User Id Cannot be empty"));
            }
            return Result<Wallet>.Success(new Wallet(Guid.NewGuid(), userId));
        }

        public void UpdateLastUpdate()
        {
            LastUpdate = DateTime.UtcNow;
        }
        public void Activate()
        {
            Status = WalletStatus.Active;
        }
        public void Freeze()
        {
            Status = WalletStatus.Freeze;
        }

        public void Credit(decimal amount)
        {
            Balance += amount;
        }

        public void Debit(decimal amount)
        {
            // if (this.Balance < amount)
            // {
            //     throw new DomainException($"your balance is less than {amount}");
            // }
            Balance -= amount;
        }
    }
}