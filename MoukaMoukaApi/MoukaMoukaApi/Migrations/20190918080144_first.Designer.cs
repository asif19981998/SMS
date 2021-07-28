﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MoukaMoukaApi.Models;

namespace MoukaMoukaApi.Migrations
{
    [DbContext(typeof(StockDbContext))]
    [Migration("20190918080144_first")]
    partial class first
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MoukaMoukaApi.Models.Category", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CategoryDetails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Customer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Code");

                    b.Property<string>("Contact");

                    b.Property<string>("Email");

                    b.Property<string>("LoyalityPoint");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CustomerDeatails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.CustomerSearchVM", b =>
                {
                    b.Property<long?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Code");

                    b.Property<string>("Contact");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CustomerSearchVM");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryId");

                    b.Property<string>("CategoryName");

                    b.Property<string>("Code");

                    b.Property<string>("Description");

                    b.Property<DateTime>("ExpireDate");

                    b.Property<string>("ImageStr");

                    b.Property<DateTime>("ManuFactureDate");

                    b.Property<string>("Name");

                    b.Property<int>("ReorderLevel");

                    b.Property<double>("UnitPrice");

                    b.HasKey("Id");

                    b.ToTable("ProductDetails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Purchase", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<double>("GrandTotal");

                    b.Property<string>("InvoiceNo");

                    b.Property<string>("SupplierId");

                    b.Property<string>("SupplierName");

                    b.HasKey("Id");

                    b.ToTable("Purchases");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.PurchaseDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<DateTime>("ExpireDate");

                    b.Property<DateTime>("ManufactureDate");

                    b.Property<string>("Name");

                    b.Property<double>("NewCostPrice");

                    b.Property<double>("NewMRP");

                    b.Property<DateTime>("PurchaseDate");

                    b.Property<long>("PurchaseId");

                    b.Property<long>("PurchaseQuantity");

                    b.Property<double>("TotalPrice");

                    b.Property<double>("UnitPrice");

                    b.HasKey("Id");

                    b.HasIndex("PurchaseId");

                    b.ToTable("PurchaseDetails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.SaleDetails", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AvailableQuantity");

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.Property<int>("Quantity");

                    b.Property<long>("SaleId");

                    b.Property<decimal>("UnitPrice");

                    b.HasKey("Id");

                    b.HasIndex("SaleId");

                    b.ToTable("SaleDetails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Sales", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CustomerId");

                    b.Property<string>("CustomerName");

                    b.Property<DateTime>("Date");

                    b.Property<decimal>("Due");

                    b.Property<decimal>("GrandTotal");

                    b.Property<string>("LoyalityPoint");

                    b.Property<decimal>("Paid");

                    b.HasKey("Id");

                    b.ToTable("Sale");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Stock", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<string>("ProductName");

                    b.Property<long?>("PurchaseId");

                    b.Property<long>("Quantity");

                    b.Property<double>("UnitPrice");

                    b.HasKey("Id");

                    b.HasIndex("PurchaseId");

                    b.ToTable("Stock");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Supplier", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Code");

                    b.Property<string>("Contact");

                    b.Property<string>("ContactPerson");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("SupplierDeatails");
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.PurchaseDetail", b =>
                {
                    b.HasOne("MoukaMoukaApi.Models.Purchase", "Purchase")
                        .WithMany("PurchaseDetails")
                        .HasForeignKey("PurchaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.SaleDetails", b =>
                {
                    b.HasOne("MoukaMoukaApi.Models.Sales", "Sale")
                        .WithMany("SaleDetails")
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MoukaMoukaApi.Models.Stock", b =>
                {
                    b.HasOne("MoukaMoukaApi.Models.Purchase")
                        .WithMany("Stock")
                        .HasForeignKey("PurchaseId");
                });
#pragma warning restore 612, 618
        }
    }
}
