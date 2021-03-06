require 'rails_helper'

RSpec.describe "GET api/v1/sitters/pending" do
  before do
    @agency = create(:user)
    @sitter_one = create(:recipient, active: true, is_deleted: false, approved: false)
    @sitter_two = create(:recipient, id: 3, email: "new@example.com", active: true,
      is_deleted: false, approved: false)
  end

  it "returns an array of all active users with role nanny" do

    get "/api/v1/sitters/pending"

    expect(json_body["sitters"].length).to eq 2
  end

  it 'only returns nannies who are not deleted' do

    get '/api/v1/sitters/pending'

    expect(json_body["sitters"][0]["is_deleted"]).to eq false
  end

  it 'will not return deleted nannies' do
    @sitter_one.is_deleted = true
    @sitter_one.save

    get '/api/v1/sitters/pending'

    expect(json_body["sitters"].length).to eq 1
  end

  it 'returns two keys: sitters, counties' do

    get '/api/v1/sitters/pending'

    expect(json_body.keys).to contain_exactly("sitters", "counties")
  end

  it 'returns an array of counties of all users with role nanny' do

    get "/api/v1/sitters/pending"

    expect(json_body["counties"].length).to eq 1
  end

  it 'returns only sitters that are active' do

    get '/api/v1/sitters/pending'

    expect(json_body["sitters"][0]["active"]).to eq true
  end

  it 'returns only sitters that are not approved' do

    get '/api/v1/sitters/pending'

    expect(json_body["sitters"][0]["approved"]).to eq false
  end

end
