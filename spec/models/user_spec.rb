require "rails_helper"

RSpec.describe User, :type => :model do
  before do
    @user = build(:user)
    @user.extend(Messageable)
  end

  it "should be valid" do
    expect(@user).to be_valid
  end

  it "without password is invalid" do
    @user.password = ""

    expect(@user).to_not be_valid
  end

  it "without first name is invalid" do
    @user.first_name = ""

    expect(@user).to_not be_valid
  end

  it "without last name is invalid" do
    @user.last_name = ""

    expect(@user).to_not be_valid
  end

  it "without email is invalid" do
    @user.email = ""

    expect(@user).to_not be_valid
  end

  it "without street is invalid" do
    @user.street = ""

    expect(@user).to_not be_valid
  end

  it "without city is invalid" do
    @user.city = ""

    expect(@user).to_not be_valid
  end

  it "without state is invalid" do
    @user.state = ""

    expect(@user).to_not be_valid
  end

  it "without zip code is invalid" do
    @user.zip_code = ""

    expect(@user).to_not be_valid
  end

  it "with invalid state is invalid" do
    @user.state = "North Carolina"

    expect(@user).to_not be_valid
  end

  it "with invalid zip is invalid" do
    @user.zip_code = "abcde123"

    expect(@user).to_not be_valid
  end

  it "with invalid birthday is invalid" do
    @user.birthday = "aksldjfkdlsjfdk"

    expect(@user).to_not be_valid
  end

  # it "with invalid hourly rate is invalid" do
  #   @user.hourly_rate = "abcde"
  #
  #   expect(@user).to_not be_valid
  # end

  it "with whole number will be valid" do
    @user.hourly_rate = "25"

    expect(@user).to be_valid
  end

  it "without phone number is invalid" do
    @user.phone_number = ""

    expect(@user).to_not be_valid
  end

  it "with invalid phone number is invalid" do
    @user.phone_number = "abscde"

    expect(@user).to_not be_valid
  end

  it "without birthday is valid" do
    @user.birthday = nil

    expect(@user).to be_valid
  end

  it "without hourly rate is valid" do
    @user.hourly_rate = nil

    expect(@user).to be_valid
  end

  it "will capitalize county input" do
    @user.county = "wake"

    @user.save!

    expect(@user.county).to eq "Wake"
  end

  it "will upcase state input" do
    @user.state = "nc"

    @user.save!

    expect(@user.state).to eq "NC"
  end

end
